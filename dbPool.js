const  mysql = require('mysql');
const myUsername = process.env['username'];
const myPassword = process.env['password'];
const myDatabase = process.env['database'];
const myHost = process.env['database']
const pool  = mysql.createPool({
    connectionLimit: 10,
    host: myHost,
    port: 3306,
    user: myUsername,
    password: myPassword,
    database: myDatabase
});

module.exports = pool;