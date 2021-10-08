'use strict'

// Require all modules needed
const express = require("express");
const app  = express();
const path = require('path');
require('dotenv').config()

// Import all the models for the database requests
const users = require("./models/users");
const orders = require("./models/orders");
const stripe = require("./models/stripe");
const products = require("./models/products");
const colours = require("./models/colours");
const images = require("./models/images");

// Expose the port specified in .env or port 5000
const port = process.env.PORT;
const connection_string = process.env.CONNECTION_STRING;


var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === 'production') {  app.use(express.static(path.join(__dirname, 'client/build')));  
  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  
})}

/**
 * Stripe API requests
 */

// Creates and returns a stripe product
app.post('/api/v1/createStripeProduct', async function(req, res) {
  let ticket_name = req.body.name;
  let ticket_description = req.body.description;
  let full_price = req.body.full_ticket_price * 100;
  let exact_price = req.body.ticket_price * 100;

  let result = await stripe.createProduct(ticket_name, ticket_description, exact_price, full_price)

  res.send(result);
});


// Creates and returns a stripe customer
app.post('/api/v1/createStripeCustomer', async function(req, res) {
  let customer_name = req.body.first_name + " " + req.body.last_name;
  let customer_email = req.body.email;
  let customer_phone = req.body.phone;

  let result = await stripe.createCustomer(customer_name, customer_email, customer_phone)

  res.send(result);
});

// Creates and returns a stripe session
app.post('/api/v1/createStripeSession', async function(req, res) {
  let tickets = req.body.tickets;
  let price_id = req.body.price_id;
  let customer_id = req.body.customer_id;

  let result = await stripe.createSession(customer_id, price_id, tickets)

  res.send(result);
});

// Creates and returns a stripe card
app.post('/api/v1/createStripeCard', async function(req, res) {
  let customer_id = req.body.customer_id;
  let card_token = req.body.card_token;

  let result = await stripe.createCard(customer_id, card_token)

  res.send(result);
});

// Creates and returns the charge data for a stripe payment
async function createStripePayment(customerId, cardID, priceID, ticketNum) {
  let result = await stripe.createPayment(priceID, ticketNum, customerId, cardID)

  return result;
}


/**
 * MySQL API requests
 */

// Check if a username and password is correct and generate a token
app.post('/api/v1/checkLogin', async function(req, res) {
  let username = req.body.username;
  let password = req.body.password
  let token = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  console.log("Checking login")

  console.log(username)
  console.log(password)

  let result = await users.checkLogin(username, password);

  console.log(result)

  if(result !== [] && result !== undefined && result.length > 0) {
    let update_token = await users.updateToken(username, password, token);

    let myResult = {};
    myResult.username = username;
    myResult.token = token;

    res.send(myResult);
  } else {
    res.send(result)
  }
});

// Check if a token and username is correct for login
app.post('/api/v1/checkAuth', async function(req, res) {
  let username = req.body.username;
  let token = req.body.token;

  let result = await users.checkExistingLogin(username, token);
  res.send(result);
});

// Log a user out by resetting their token
app.post('/api/v1/LogOut', async function(req, res) {
  let username = req.body.username;
  let token = req.body.token;
  
  let update_token = await users.removeToken(username, token);

  let myResult = {};
  myResult.username = username;
  myResult.token = "";

  res.send(myResult);
});

// Add a new order to the queue
app.get('/api/v1/getOrders', async function(req, res) {
  let queue_results = await orders.getOrders();
  res.send(queue_results)
});

// Add a new order to the queue
app.post('/api/v1/getNewOrders', async function(req, res) {
  let insert_json = req.body;

  let queue_results = await orders.getNewOrders(insert_json);
  
  res.send(queue_results)
});

// Add a new order to the queue
app.post('/api/v1/getOrderDetails', async function(req, res) {
  let insert_json = req.body;

  let queue_results = await orders.getOrderStatus(insert_json);

  res.send(queue_results)
});

app.post('/api/v1/SendEmail', function(req, res) {

  var mailOptions = {
    from: 'mquigleyautoreply@gmail.com',
    to: 'mackenziequigley@outlook.com',
    subject: "Order Form for " + req.body.type,
    text: "Hi Tara!\n" + req.body.email +
    " submitted the following order:\nItem:" + req.body.type + "\nColour:"
    + req.body.colour + "\nThread Colour:"
    + req.body.thread_colour + "\nHardware:"
    + req.body.hardware + "\nEngraving: \"" 
    + req.body.engraving + "\"\n"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send("{\"Error\":\"" + error + "\"}");
    } else {
      console.log('Email sent: ' + info.response);
      res.send("{\"Error\":\"None\"}");
    }
  });
});

// Add a new order to the queue
app.post('/api/v1/addOrder', async function(req, res) {
  let insert_json = req.body;

  var text = "Item: " + req.body.type + ", Colour: "
    + req.body.colour + ", Thread Colour: "
    + req.body.thread_colour + ", Hardware: "
    + req.body.hardware + ", Engraving: \"" 
    + req.body.engraving + "\"" + ", Description: \""
    + req.body.description + "\"";

  insert_json.details = text;

  let queue_results = await orders.addOrder(insert_json);
  
  res.send(queue_results)
});

// Add a new order to the queue
app.post('/api/v1/updateOrderData', async function(req, res) {
  let insert_json = req.body;

  let queue_results = await orders.updateOrder(insert_json);
  
  res.send(queue_results)
});

// Get the status of an order given the ID
app.post('/api/v1/getOrderStatus', async function(req, res) {
  let order_id = req.body.id;

  let queue_results = await orders.getOrderStatus(order_id);
  
  res.send(queue_results)
});

// Add a new order to the queue
app.get('/api/v1/getProducts', async function(req, res) {
  let product_results = await products.getProducts();
  res.send(product_results)
});

// Add a new order to the queue
app.get('/api/v1/getColours', async function(req, res) {
  let colours_results = await colours.getColours();
  res.send(colours_results)
});

// Add a new order to the queue
app.get('/api/v1/getImages', async function(req, res) {
  let image_results = await images.getImages();
  res.send(image_results)
});

// Add a new order to the queue
app.post('/api/v1/getImage', async function(req, res) {
  let id = req.body.id;

  let image_results = await images.getImage(id);

  res.send(image_results)
});

// Add a new order to the queue
app.post('/api/v1/getProduct', async function(req, res) {
  let id = req.body.id;

  let product_results = await products.getProduct(id);

  res.send(product_results)
});

// Add a new order to the queue
app.post('/api/v1/deleteProduct', async function(req, res) {
  let id = req.body.id;

  let product_results = await products.deleteProduct(id);

  res.send(product_results)
});

// Add a new order to the queue
app.post('/api/v1/deleteImage', async function(req, res) {
  let id = req.body.id;

  let images_results = await images.deleteImage(id);

  res.send(images_results)
});

// Add a new order to the queue
app.post('/api/v1/updateProduct', async function(req, res) {
  let insert_json = req.body;

  let queue_results = await products.updateProduct(insert_json);
  
  res.send(queue_results)
});

// Add a new order to the queue
app.post('/api/v1/updateImage', async function(req, res) {
  let insert_json = req.body;

  let image_results = await images.updateImage(insert_json);
  
  res.send(image_results)
});

// Add a new order to the queue
app.post('/api/v1/addProduct', async function(req, res) {
  let insert_json = req.body;

  let product_results = await products.addProduct(insert_json);
  
  res.send(product_results)
});

// Add a new order to the queue
app.post('/api/v1/addColour', async function(req, res) {
  let insert_json = req.body;

  let colours_result = await colours.addColour(insert_json);
  
  res.send(colours_result)
});

// Add a new order to the queue
app.post('/api/v1/addImage', async function(req, res) {
  let insert_json = req.body;

  let image_results = await images.addImage(insert_json);
  
  res.send(image_results)
});

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

async function initTables() {
  let users_result = await users.initUsersTable();
  console.log(users_result);

  let products_result = await products.initProductsTable();
  console.log(products_result);

  let colours_result = await colours.initColoursTable();
  console.log(colours_result);

  let images_result = await images.initImagesTable();
  console.log(images_result);

  let order_result = await orders.initOrdersTable();
  console.log(order_result);

  let result = await users.checkLogin(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);

  if(result === [] || result === undefined || result.length === 0) {
    users.addAdminUser(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
  }
}

initTables();

// Listen to the specified port for api requests
app.listen(port);
console.log('Running app at localhost: ' + port);
