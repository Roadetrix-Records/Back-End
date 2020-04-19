
exports.up = function(knex) {
  return knex.schema
  .createTable('Albums', table => {
        table.text('id')
            .primary();
        table.text('name')
            .notNullable();
        table.text('releaseDate')
            .notNullable();
        table.text('imgUrl')
            .notNullable();
        table.text('externalUrl')
            .notNullable();
  })
  .createTable('Tracks', table => {
        table.text('id')
            .primary();
        table.text('name')
            .notNullable();
        table.text('trackUrl')
            .notNullable();
  })
  .createTable('Artists', table => {
        table.text('id')
            .primary();
        table.text('name')
            .notNullable();
        table.text('externalUrl')
            .notNullable();
        table.integer('followers')
            .notNullable();
        table.text('imgUrl')
            .notNullable();
  })
  .createTable('AlbumTracks', table => {
        table.text('albumId')
            .notNullable()
            .references('Albums.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.text('trackId')
            .notNullable()
            .references('Tracks.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.primary(['albumId', 'trackId']);
  })
  .createTable('AlubmArtists', table => {
        table.text('albumId')
            .notNullable()
            .references('Albums.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.text('artistId')
            .notNullable()
            .references('Artists.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.primary(['albumId', 'artistId']);
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('AlbumArtists')
    .dropTableIfExists('AlbumTracks')
    .dropTableIfExists('Artists')
    .dropTableIfExists('Tracks')
    .dropTableIfExists('Albums')
};
