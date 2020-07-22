
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('LastFetch').del()
    .then(function () {
      // Inserts seed entries
      return knex('LastFetch').insert([
        {id: 1, date: null}
      ]);
    });
};
