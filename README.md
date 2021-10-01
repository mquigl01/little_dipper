# Author: Mackenzie Quigley
## Last Updated: July 23rd 2021
#### Email: mquigl01@uoguelph.ca
#### Description: Contains the front-end and back-end code of a website that creates raffles and can allow users to purchase tickets

## Stripe

### Setup
1. go to https://stripe.com/en-gb-ca and create an account
2. setup all the default settings and add in the st marys rotary club payment infomration (skip setting up the payment information if just testing locally)
3. go into developers section and click on "API keys option"
4. note you have a "Publishable key" and a "Secret key" you will need to secret key for your backend set up later and the publishable key for your frontend set up later
5. the code is set up to create all the products, prices, customer info, and card info but you can use the stripe dashboard to set up coupons or keep track of purchases

## MySql

### Setup
1. download the install file for your system here https://dev.mysql.com/downloads/installer/
2. run the installer, set all the default settings
3. set up a username and password when creating the db, remember this information for later
4. you can download the MySQL workbench tool here for testing your db setup and setting up the db tables: https://dev.mysql.com/downloads/workbench/

### Tables
draws
> - id: primary key, int, auto increment
> - name: VARCHAR(100)
> - description: VARCHAR(500)
> - location: VARCHAR(200)
> - start: datetime
> - end: datetime
> - tickets: int
> - reserved_tickets: int
> - over_nineteen: boolean
> - value: decimal
> - ticket_price: decimal
> - full_ticket_price: decimal
> - pre_post_draw: boolean
> - pre_post_draw_description: VARCHAR(500)
> - pre_post_draw_location: VARCHAR(200)
> - pre_post_draw_date: datetime
> - pre_post_draw_value: decimal
> - stripe_full_price: VARCHAR(100)
> - stripe_price: VARCHAR(100)
> - stripe_product: VARCHAR(100)

tickets
> - id: primary key, int, auto increment
> - draw_id: foreign key, int, links to id column in draws table
> - order_id: foreign key, int, links to id column in order_queue table
> - ticket_number: int
> - type: VARCHAR(20)

order_queue
> - id: primary key, int, auto increment
> - draw_id: foreign key, int, links to id column in draws table
> - status: VARCHAR(20)
> - date_added: datetime
> - tickets: int
> - first_name: VARCHAR(100)
> - last_name: VARCHAR(100)
> - po_box: VARCHAR(10)
> - address_line_one: VARCHAR(200)
> - address_line_two: VARCHAR(200)
> - postal_code: VARCHAR(10)
> - city: VARCHAR(50)
> - province: VARCHAR(50)
> - country: VARCHAR(50)
> - email: VARCHAR(50)
> - phone: VARCHAR(20)
> - invoice: VARCHAR(300)
> - customer_id: VARCHAR(100)
> - card_id: VARCHAR(100)
> - stripe_product_id: VARCHAR(100)
> - stripe_price_id: VARCHAR(100)

users
> - id: primary key, int, auto increment
> - username: VARCHAR(100)
> - password: VARCHAR(100)
> - token: VARCHAR(100)

## Backend

### Build and Run
1. cd into ./backend folder
2. create a file in the directory called ".env"
3. add the following variables into your ".env" file (filled in with your own information from the stripe and mysql setup):
````
SQL_HOST=""
SQL_USER=""
SQL_PASSWORD=""
STRIPE_KEY=""
````
4. type "npm install" into cmd
5. once that has finished, type "node server.js" into cmd
6. Wait for the file to run, keep the terminal open and run the frontend

## Frontend

### Build and Run
1. cd into ./frontend folder
2. type "npm install" into cmd
3. once that has finished, type "npm run start" into cmd
4. Wait for the web page to start, keep the terminal open you should be able to access it at localhost:3000