// const environment = process.env.NODE_ENV || 'development';
// const config = require('../knexfile');
// const knex = require('knex');
// const environmentConfig = config[environment];
// const connection = knex(environmentConfig);

// module.exports = connection;

const knex = require('knex');
const knexFile = require('../knexfile');

// Add 'production' to DB_ENV in config vars on heroku
// Run migrations in heroku console
const environment = process.env.DB_ENV || 'development';

module.exports = knex(knexFile[environment]);