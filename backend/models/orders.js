
var mysql = require('mysql');

module.exports = {
    initOrdersTable: function () {
        // Create a connection to the MySQL database
        var con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });
        
        return new Promise((res, rej) => {
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    let myError = {};
                    myError.error = err;
                    rej(myError);
                }

                let sql = `CREATE TABLE IF NOT EXISTS orders (id INT AUTO_INCREMENT, status VARCHAR(20), notes TEXT, details TEXT, likes_dislikes TEXT, links TEXT, date_added DATETIME, first_name VARCHAR(100), last_name VARCHAR(100), po_box VARCHAR(10), address_line_one VARCHAR(200), address_line_two VARCHAR(200), postal_code VARCHAR(10), city VARCHAR(50), province VARCHAR(50), country VARCHAR(50), email VARCHAR(50), phone VARCHAR(20), invoice VARCHAR(300), customer_id VARCHAR(100), card_id VARCHAR(100), stripe_product_id VARCHAR(100), stripe_price_id VARCHAR(100), PRIMARY KEY (id));`

                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res("Created Orders Table");
                });
            });
        });
    },

    getOrders: function () {
        // Create a connection to the MySQL database
        var con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });

        return new Promise((res, rej) => {
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    let myError = {};
                    myError.error = err;
                    rej(myError);
                }

                con.query("SELECT * FROM orders ORDER BY date_added ASC;", function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res(result);
                });
            });
        });
    },

    getNewOrders: function () {
        // Create a connection to the MySQL database
        var con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });

        return new Promise((res, rej) => {
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    let myError = {};
                    myError.error = err;
                    rej(myError);
                }

                con.query("SELECT * FROM orders WHERE status = 'New' ORDER BY date_added ASC;", function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res(result);
                });
            });
        });
    },

    getOrderStatus: function (order_id) {
        // Create a connection to the MySQL database
        var con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });

        return new Promise((res, rej) => {
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    let myError = {};
                    myError.error = err;
                    rej(myError);
                }

                con.query("SELECT * FROM orders WHERE id = (?);", order_id, function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res(result);
                });
            });
        });
    },

    addOrder: function (insert_json) {
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
        let customer_id = insert_json.stripe_id;
        let date_added = this.dateFormated();
        let status = "New";

        // Create a connection to the MySQL database
        var con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });

        return new Promise((res, rej) => {
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    let myError = {};
                    myError.error = err;
                    rej(myError);
                }

                con.query("INSERT INTO orders(status, details, likes_dislikes, links, notes, date_added, first_name, last_name, po_box, address_line_one, address_line_two, postal_code, city, province, country, email, phone, invoice, customer_id, card_id, stripe_product_id, stripe_price_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", 
                [status, details, likes_dislikes, links, notes, date_added, first_name, last_name, po_box, address_line_one, address_line_two, postal_code, city, province, country, email, phone, "", customer_id, card_id, stripe_product_id, stripe_price_id], 
                function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res(result);
                });
            });
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

        // Create a connection to the MySQL database
        var con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });

        return new Promise((res, rej) => {
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    let myError = {};
                    myError.error = err;
                    rej(myError);
                }

                con.query("UPDATE orders SET status = ?, details = ?, notes = ?, first_name = ?, last_name = ?, po_box = ?, address_line_one = ?, address_line_two = ?, postal_code = ?, city = ?, province = ?, country = ?, email = ?, phone = ? WHERE id = ?;", 
                [status, details, notes, first_name, last_name, po_box, address_line_one, address_line_two, postal_code, city, province, country, email, phone, id], function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res(result);
                });
            });
        });
    },

    updateOrderStatus: function (order_id, status, invoice) {
        // Create a connection to the MySQL database
        var con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });

        return new Promise((res, rej) => {
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    let myError = {};
                    myError.error = err;
                    rej(myError);
                }

                con.query("UPDATE orders SET status = ?, invoice = ? WHERE id = ?;", 
                [status, invoice, order_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res(result);
                });
            });
        });
    },

    deleteOrder: function (id) {
        // Create a connection to the MySQL database
        var con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });

        return new Promise((res, rej) => {
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    let myError = {};
                    myError.error = err;
                    rej(myError);
                }

                con.query("DELETE FROM orders WHERE id = (?);", id, function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res(result);
                });
            });
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