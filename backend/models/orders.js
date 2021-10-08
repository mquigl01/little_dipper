const promisePool = require('../repositories/mysql');

module.exports = {
    initOrdersTable: function () {
        return new Promise(async (res, rej) => {
            let sql = `CREATE TABLE IF NOT EXISTS orders (id INT AUTO_INCREMENT, product VARCHAR(200), status VARCHAR(20), notes TEXT, details TEXT, likes_dislikes TEXT, links TEXT, date_added DATETIME, first_name VARCHAR(100), last_name VARCHAR(100), po_box VARCHAR(10), address_line_one VARCHAR(200), address_line_two VARCHAR(200), postal_code VARCHAR(10), city VARCHAR(50), province VARCHAR(50), country VARCHAR(50), email VARCHAR(50), phone VARCHAR(20), invoice VARCHAR(300), customer_id VARCHAR(100), card_id VARCHAR(100), stripe_product_id VARCHAR(100), stripe_price_id VARCHAR(100), PRIMARY KEY (id));`

            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in initOrdersTable: ${JSON.stringify(rows)}`);

            res("Created Orders Table");
        });
    },

    getOrders: function () {
        return new Promise(async (res, rej) => {
            let sql = `SELECT * FROM orders ORDER BY date_added ASC;`;
            
            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in getOrders: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getNewOrders: function () {

        return new Promise(async (res, rej) => {
            let sql = "SELECT * FROM orders WHERE status = 'New' ORDER BY date_added ASC;";
            
            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in getNewOrders: ${JSON.stringify(rows)}`);

            res(rows);
        });  
    },

    getOrderStatus: function (order_id) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM orders WHERE id = (?);';
            
            const [rows, fields] = await promisePool.query(sql, [order_id]);

            console.log(`Rows in getOrder: ${JSON.stringify(rows)}`);

            res(rows);
        });  
    },

    addOrder: function (insert_json) {
        console.log(insert_json)
        let card_id = insert_json.card_id;
        let details = insert_json.details;
        let likes_dislikes = insert_json.likes_dislikes;
        let links = insert_json.links;
        let stripe_price_id = insert_json.stripe_price_id;
        let stripe_product_id = insert_json.stripe_product_id;
        let first_name = insert_json.firstname;
        let last_name = insert_json.lastname;
        let po_box = insert_json.po_box;
        let address_line_one = insert_json.address_line_one;
        let address_line_two = insert_json.address_line_two;
        let city = insert_json.city;
        let postal_code = insert_json.postal_code;
        let province = insert_json.province;
        let country = insert_json.country;
        let email = insert_json.email;
        let notes = insert_json.notes;
        let phone = insert_json.phone;
        let product = insert_json.product;
        let customer_id = insert_json.stripe_id;
        let date_added = this.dateFormated();
        let status = "New";

        return new Promise(async (res, rej) => {
            let sql = 'INSERT INTO orders(product, status, details, likes_dislikes, links, notes, date_added, first_name, last_name, po_box, address_line_one, address_line_two, postal_code, city, province, country, email, phone, invoice, customer_id, card_id, stripe_product_id, stripe_price_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
            
            const [rows, fields] = await promisePool.query(sql, [product, status, details, likes_dislikes, links, notes, date_added, first_name, last_name, po_box, address_line_one, address_line_two, postal_code, city, province, country, email, phone, "", customer_id, card_id, stripe_product_id, stripe_price_id]);

            console.log(`Rows in addOrder: ${JSON.stringify(rows)}`);

            res(rows);
        }); 
    },
    
    updateOrder: function (insert_json) {
        let first_name = insert_json.firstname;
        let last_name = insert_json.lastname;
        let po_box = insert_json.po_box;
        let address_line_one = insert_json.address_line_one;
        let address_line_two = insert_json.address_line_two;
        let city = insert_json.city;
        let postal_code = insert_json.postal_code;
        let province = insert_json.province;
        let country = insert_json.country;
        let email = insert_json.email;
        let notes = insert_json.notes;
        let phone = insert_json.phone;
        let status = insert_json.status;
        let details = insert_json.details;
        let id = insert_json.id;

        return new Promise(async (res, rej) => {
            let sql = 'UPDATE orders SET status = ?, details = ?, notes = ?, first_name = ?, last_name = ?, po_box = ?, address_line_one = ?, address_line_two = ?, postal_code = ?, city = ?, province = ?, country = ?, email = ?, phone = ? WHERE id = ?;'
            
            const [rows, fields] = await promisePool.query(sql, [status, details, notes, first_name, last_name, po_box, address_line_one, address_line_two, postal_code, city, province, country, email, phone, id]);

            console.log(`Rows in updateOrder: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    updateOrderStatus: function (order_id, status, invoice) {
        return new Promise(async (res, rej) => {
            let sql = 'UPDATE orders SET status = ?, invoice = ? WHERE id = ?;'
            
            const [rows, fields] = await promisePool.query(sql, [status, invoice, order_id]);

            console.log(`Rows in updateOrderStatus: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    deleteOrder: function (id) {
        return new Promise(async (res, rej) => {
            let sql = 'DELETE FROM orders WHERE id = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [id]);

            console.log(`Rows in deleteOrder: ${JSON.stringify(rows)}`);

            res(rows);
        }); 
    },

    twoDigits: function (d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    },

    dateFormated: function() {
        let myDate = new Date();
        return myDate.getUTCFullYear() + "-" + this.twoDigits(1 + myDate.getUTCMonth()) + "-" + this.twoDigits(myDate.getUTCDate()) + " " + this.twoDigits(myDate.getUTCHours()) + ":" + this.twoDigits(myDate.getUTCMinutes()) + ":" + this.twoDigits(myDate.getUTCSeconds());
    },
};