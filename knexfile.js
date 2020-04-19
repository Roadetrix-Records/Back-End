// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    user: process.env.PG_USERNAME, 
    password: process.env.PG_PASSWORD,
    connection: 'postgres://localhost/roadetrix',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
