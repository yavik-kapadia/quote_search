const  mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit: 10,
    host: "lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "p89txflzcme0gsfk",
    password: "j1sc6bahlre15gz0",
    database: "t9f8zj6kryuxuyc4"
});

module.exports = pool;
