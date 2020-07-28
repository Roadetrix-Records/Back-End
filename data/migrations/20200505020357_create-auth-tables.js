exports.up = function(knex) {
    return knex.schema
    .createTable('Admins', table => {
        table.increments();
        table.text('username')
        .unique();
        table.text('password');
        table.text('firstName');
        table.text('lastName');
    })
    .createTable('LastFetch', table => {
        table.increments();
        table.text('date');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Admins')
    .dropTableIfExists('LastFetch');
};
