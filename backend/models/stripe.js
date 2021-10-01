const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = {
    createCustomer: async function (customer_name, customer_email, customer_phone) {
        const customer = await stripe.customers.create({
            name: customer_name,
            email: customer_email,
            phone: customer_phone
        });

        return customer;
    },

    createSession: async function (customer_id, price_id, tickets) {
        const session = await stripe.checkout.sessions.create({
            success_url: '',
            cancel_url: '',
            customer: customer_id,
            payment_method_types: ['card'],
            line_items: [
              {price: price_id, quantity: tickets},
            ],
            mode: 'payment',
          });

        return session;
    },

    createCard: async function (customer_id, card_token) {
        const card = await stripe.customers.createSource(
            customer_id,
            {source: card_token}
        );

        return card;
    },

    createProduct: async function (ticket_name, ticket_description, exact_price, full_price) {
        const product = await stripe.products.create({
            name: ticket_name,
            description: ticket_description
        });
        
        const price = await stripe.prices.create({
            unit_amount: exact_price,
            currency: 'cad',
            product: product.id,
        });
        
        const fullPrice = await stripe.prices.create({
            unit_amount: full_price,
            currency: 'cad',
            product: product.id,
        });
        
        let myResult = {};
        myResult.product = product;
        myResult.price = price;
        myResult.full_price = fullPrice;
        
        return myResult;
    },

    createPayment: async function (price_id, tickets, customer_id, card_id) {
        const price = await stripe.prices.retrieve(
            price_id
        );
        
        let charge_amount = price.unit_amount * tickets;
        
        const charge = await stripe.charges.create({
            amount: charge_amount,
            currency: 'cad',
            customer: customer_id,
            source: card_id,
            description: 'St Marys Rotary Club Tickets',
        });

        return charge;
    },
};