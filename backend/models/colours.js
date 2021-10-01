
var mysql = require('mysql');

module.exports = {
    initColoursTable: function () {
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

                let sql = `CREATE TABLE IF NOT EXISTS colours (id INT AUTO_INCREMENT, name VARCHAR(200), hex VARCHAR(50), date_added DATETIME, PRIMARY KEY (id));`

                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res("Created colours Table");
                });
            });
        });
    },

    getColours: function () {
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

                con.query("SELECT * FROM colours ORDER BY date_added ASC;", function (err, result) {
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

    getColour: function (id) {
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

                con.query("SELECT * FROM colours WHERE id = (?);", id, function (err, result) {
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

    addColour: function (insert_json) {
        let name = insert_json.name;
        let hex = insert_json.hex;
        let date_added = this.dateFormated();

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

                con.query("INSERT INTO colours(name, hex, date_added) VALUES(?,?,?);", 
                [name, hex, date_added], 
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