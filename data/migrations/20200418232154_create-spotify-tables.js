
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
        table.text('privateUrl')
            .notNullable();
        table.boolean('isHidden')
            .notNullable()
            .defaultTo(false)
  })
  .createTable('Tracks', table => {
        table.text('id')
            .primary();
        table.text('name')
            .notNullable();
        table.text('externalUrl')
            .notNullable();
        table.text('privateUrl')
            .notNullable();
        table.integer('duration')
            .notNullable();
        table.boolean('explicit')
            .notNullable();
        table.text('previewUrl')
            .notNullable();
  })
  .createTable('Artists', table => {
        table.text('id')
            .primary();
        table.text('name')
            .notNullable();
        table.text('externalUrl')
            .notNullable();
        table.text('privateUrl')
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
  .createTable('AlbumArtists', table => {
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
  .createTable('TrackArtists', table => {
        table.text('trackId')
            .notNullable()
            .references('Tracks.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.text('artistId')
            .notNullable()
            .references('Artists.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.primary(['trackId', 'artistId']);
  })
  .createTable('FeaturedAlbum', table => {
        table.increments();
        table.text('albumId');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('FeaturedAlbum')
    .dropTableIfExists('TrackArtists')
    .dropTableIfExists('AlbumArtists')
    .dropTableIfExists('AlbumTracks')
    .dropTableIfExists('Artists')
    .dropTableIfExists('Tracks')
    .dropTableIfExists('Albums')
};
