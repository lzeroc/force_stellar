const mysql = require('promise-mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'stellar',
    port: 3306
});
module.exports = pool;
