const mariadb = require('mariadb');
const env = require(`./environment`);

const config = {
    host: '127.0.0.1',
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    port: env.dbPort,
    connectionLimit: 10,
}

const pool = mariadb.createPool(config);

module.exports = pool;