var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase'
})


module.exports = pool;