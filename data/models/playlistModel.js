const db = require('../dbConfig');

module.exports = {
    getPlaylists,
    clearPlaylists,
    setPlaylists
}

function getPlaylists(){
    return db('Playlists');
}

function clearPlaylists(){
    return db('Playlists').where('id', '!=', '0').del();
}

function setPlaylists(playlists){
    return db('Playlists')
        .insert(playlists)
}
