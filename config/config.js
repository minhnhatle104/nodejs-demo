// Load environment variables from .env file and override username ( default username = username of local machine)
require('dotenv').config({
    path: '.env',
    override: true,
});;

module.exports = {
    development: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        port: 22374,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
                ca: process.env.ca
            }
        },
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'mysql',
    },
};