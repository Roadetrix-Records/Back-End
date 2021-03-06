exports.up = function(knex) {
    return knex.schema
    .createTable('Submissions', table => {
        table.increments();
        table.text('firstName', 26)
        .notNullable();
        table.text('lastName', 26)
        .notNullable();
        table.text('email', 320)
        .notNullable();
        table.text('demoLink')
        .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Submissions');
};
