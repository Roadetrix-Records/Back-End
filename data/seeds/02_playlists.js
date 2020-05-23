
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Playlists').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Playlists').insert([
        {id: 1, url: '', playlistId: '', img: '', privateUrl: ''},
        {id: 2, url: '', playlistId: '', img: '', privateUrl: ''},
        {id: 3, url: '', playlistId: '', img: '', privateUrl: ''},
        {id: 4, url: '', playlistId: '', img: '', privateUrl: ''}
      ]);
    });
};
