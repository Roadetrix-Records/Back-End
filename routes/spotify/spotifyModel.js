const db = require('../../data/dbConfig');

module.exports = {
    clearAlbumTracks,
    clearAlbumArtists,
    clearTracks,
    clearArtists,
    clearAlbums
}

function clearAlbumTracks(){
    return db('AlbumTracks').del();
}

function clearAlbumArtists(){
    return db('AlbumArtists').del();
}

function clearTracks(){
    return db('Tracks').del();
}

function clearArtists(){
    return db('Artists').del();
}

function clearAlbums(){
    return db('Albums').del();
}