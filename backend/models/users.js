var mysql = require('mysql');

module.exports = {
    initUsersTable: function () {
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

                let sql = `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT, username VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, token VARCHAR(100), PRIMARY KEY (id));`

                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res("Created Users Table");
                });
            });
        });
    },

    addAdminUser: function (username, password) {
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

                con.query("INSERT INTO users(username, password) VALUES(?,?);", [username, password], function (err, result) {
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

    checkLogin: function (username, password) {
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

                con.query("SELECT * FROM users WHERE username = (?) AND password = (?);", [username, password], function (err, result) {
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

    checkExistingLogin: function (username, token) {
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

                con.query("SELECT * FROM users WHERE username = (?) AND token = (?);", [username, token], function (err, result) {
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

    updateToken: function (username, password, token) {
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

                con.query("UPDATE users SET token = (?) WHERE username = (?) AND password = (?);", [token, username, password], function (err, result) {
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

    removeToken: function (username, token) {
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

                con.query("UPDATE users SET token = (?) WHERE username = (?) AND token = (?);", ["", username, token], function (err, result) {
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
};