const promisePool = require('../repositories/mysql');

module.exports = {
    initProductsTable: function () {
        return new Promise(async (res, rej) => {
            let sql = `CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT, name VARCHAR(200), images TEXT, description TEXT,  colours TEXT,  thread_colours TEXT,  hardware TEXT, date_added DATETIME, PRIMARY KEY (id));`

            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in initProductsTable: ${JSON.stringify(rows)}`);

            res("Created Products Table");
        });
    },

    getProducts: function () {
        return new Promise(async (res, rej) => {
            let sql = `SELECT * FROM products ORDER BY date_added ASC;`;
            
            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in getProducts: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getProduct: function (id) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM products WHERE id = (?);';
            
            const [rows, fields] = await promisePool.query(sql, [id]);

            console.log(`Rows in getProduct: ${JSON.stringify(rows)}`);

            res(rows);
        });  
    },

    addProduct: function (insert_json) {
        let name = insert_json.name;
        let description = insert_json.description;
        let images = insert_json.images;
        let date_added = this.dateFormated();

        return new Promise(async (res, rej) => {
            let sql = 'INSERT INTO products(name, description, images, date_added) VALUES(?,?,?,?);';
            
            const [rows, fields] = await promisePool.query(sql, [name, description, images, date_added]);

            console.log(`Rows in addProduct: ${JSON.stringify(rows)}`);

            res(rows);
        }); 
    },
    
    updateProduct: function (insert_json) {
        let name = insert_json.name;
        let description = insert_json.description;
        let images = insert_json.images;
        let id = insert_json.id;

        return new Promise(async (res, rej) => {
            let sql = 'UPDATE products SET name = ?, description = ?, images = ? WHERE id = ?;'
            
            const [rows, fields] = await promisePool.query(sql, [name, description, images, id]);

            console.log(`Rows in updateProduct: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    deleteProduct: function (id) {
        return new Promise(async (res, rej) => {
            let sql = 'DELETE FROM products WHERE id = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [id]);

            console.log(`Rows in deleteProduct: ${JSON.stringify(rows)}`);

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