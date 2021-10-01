
var mysql = require('mysql');

module.exports = {
    initImagesTable: function () {
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

                let sql = `CREATE TABLE IF NOT EXISTS images (id INT AUTO_INCREMENT, caption VARCHAR(400), src VARCHAR(400), date_added DATETIME, PRIMARY KEY (id));`

                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        let myError = {};
                        myError.error = err;
                        rej(myError);
                    }

                    res("Created images Table");
                });
            });
        });
    },

    getImages: function () {
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

                con.query("SELECT * FROM images ORDER BY date_added DESC;", function (err, result) {
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

    getImage: function (id) {
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

                con.query("SELECT * FROM images WHERE id = (?);", id, function (err, result) {
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

    addImage: function (insert_json) {
        let caption = insert_json.caption;
        let src = insert_json.src;
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

                con.query("INSERT INTO images(caption, src, date_added) VALUES(?,?,?);", 
                [caption, src, date_added], 
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

    updateImage: function (insert_json) {
        let caption = insert_json.caption;
        let src = insert_json.src;
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

                con.query("UPDATE images SET caption = ?, src = ? where id = ?;", 
                [caption, src, id], 
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

    deleteImage: function (id) {
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

                con.query("DELETE FROM images WHERE id = (?);", id, function (err, result) {
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