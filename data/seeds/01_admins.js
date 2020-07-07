const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Admins').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Admins').insert([
        { 
          username: 'jonahtuska',
          password: bcrypt.hashSync(process.env.ADMIN_PASSWORD),
          firstName: 'Jonah',
          lastName: 'Tuska'
        },
      ]);
    });
};
