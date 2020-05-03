const knex = require('knex');
const knexFile = require('../knexfile');

// Add 'production' to DB_ENV in config vars on heroku
// Run migrations in heroku console
const environment = process.env.DB_ENV || 'development';

module.exports = knex(knexFile[environment]);