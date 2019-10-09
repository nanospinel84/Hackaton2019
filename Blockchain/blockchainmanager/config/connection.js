let mysql = require('mysql');

exports.mysqlconnectionC = function (env) {
    let mysqlconnection = mysql.createPool({
        host: env.DATABASE.HOST,
        user: env.DATABASE.USER,
        password: env.DATABASE.PASSWORD,
        database: env.DATABASE.NAME,
        port: env.DATABASE.PORT,
        connectionLimit: env.DATABASE.CONNECTION_LIMIT
    });
    return mysqlconnection;
} 
