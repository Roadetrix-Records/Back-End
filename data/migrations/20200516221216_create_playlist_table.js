exports.up = function(knex) {
  return knex.schema
    .createTable('Playlists', table => {
        table.increments();
        table.text('url')
        .notNullable();
        table.text('playlistId')
        .notNullable();
        table.text('img')
        .notNullable();
        table.text('privateUrl')
        .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Playlists');
};
