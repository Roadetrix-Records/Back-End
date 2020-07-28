
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('FeaturedAlbum').del()
    .then(function () {
      // Inserts seed entries
      return knex('FeaturedAlbum').insert([
        {id: 1, albumId: null},
      ]);
    });
};
