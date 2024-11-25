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
        dialectModule: require('pg'),
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
                ca: process.env.ca
            }
        },
    },
    production: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        port: 22374,
        dialect: 'postgres',
        dialectModule: require('pg'),
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
                ca: process.env.ca
            }
        },
    }
};