const promisePool = require('../repositories/mysql');

module.exports = {
    initImagesTable: function () {
        return new Promise(async (res, rej) => {
            let sql = `CREATE TABLE IF NOT EXISTS images (id INT AUTO_INCREMENT, caption VARCHAR(400), src VARCHAR(400), date_added DATETIME, PRIMARY KEY (id));`

            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in initImagesTable: ${JSON.stringify(rows)}`);

            res("Created Images Table");
        });
    },

    getImages: function () {
        return new Promise(async (res, rej) => {
            let sql = `SELECT * FROM images ORDER BY date_added DESC;`;
            
            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in getImages: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getImage: function (id) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM images WHERE id = (?);';
            
            const [rows, fields] = await promisePool.query(sql, [id]);

            console.log(`Rows in getImage: ${JSON.stringify(rows)}`);

            res(rows);
        });  
    },

    addImage: function (insert_json) {
        let caption = insert_json.caption;
        let src = insert_json.src;
        let date_added = this.dateFormated();

        return new Promise(async (res, rej) => {
            let sql = 'INSERT INTO images(caption, src, date_added) VALUES(?,?,?);';
            
            const [rows, fields] = await promisePool.query(sql, [caption, src, date_added]);

            console.log(`Rows in addImage: ${JSON.stringify(rows)}`);

            res(rows);
        }); 
    },

    updateImage: function (insert_json) {
        let caption = insert_json.caption;
        let src = insert_json.src;
        let id = insert_json.id;

        return new Promise(async (res, rej) => {
            let sql = 'UPDATE images SET caption = ?, src = ? where id = ?;'
            
            const [rows, fields] = await promisePool.query(sql, [caption, src, id]);

            console.log(`Rows in updateImage: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    deleteImage: function (id) {
        return new Promise(async (res, rej) => {
            let sql = 'DELETE FROM images WHERE id = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [id]);

            console.log(`Rows in deleteImage: ${JSON.stringify(rows)}`);

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