const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Admins').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Admins').insert([
        { 
          username: 'jonahtuska',
          password: bcrypt.hashSync('password'),
          firstName: 'Jonah',
          lastName: 'Tuska'
        },
      ]);
    });
};
