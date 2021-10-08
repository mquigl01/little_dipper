
const promisePool = require('../repositories/mysql');

module.exports = {
    initColoursTable: function () {
        return new Promise(async (res, rej) => {
            let sql = `CREATE TABLE IF NOT EXISTS colours (id INT AUTO_INCREMENT, name VARCHAR(200), hex VARCHAR(50), date_added DATETIME, PRIMARY KEY (id));`

            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in initColoursTable: ${JSON.stringify(rows)}`);

            res("Created Colours Table");
        });
    },

    getColours: function () {
        return new Promise(async (res, rej) => {
            let sql = `SELECT * FROM colours ORDER BY date_added ASC;`;
            
            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in getColours: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getColour: function (id) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM colours WHERE id = (?);';
            
            const [rows, fields] = await promisePool.query(sql, [id]);

            console.log(`Rows in getColour: ${JSON.stringify(rows)}`);

            res(rows);
        });  
    },

    addColour: function (insert_json) {
        let name = insert_json.name;
        let hex = insert_json.hex;
        let date_added = this.dateFormated();

        return new Promise(async (res, rej) => {
            let sql = 'INSERT INTO colours(name, hex, date_added) VALUES(?,?,?);';
            
            const [rows, fields] = await promisePool.query(sql, [name, hex, date_added]);

            console.log(`Rows in addColour: ${JSON.stringify(rows)}`);

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