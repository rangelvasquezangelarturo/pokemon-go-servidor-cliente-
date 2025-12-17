// Se importara la información que exista en el archivo .env

require('dotenv').config();

const env = {
    port: process.env.PORT,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD

};

module.exports = env;