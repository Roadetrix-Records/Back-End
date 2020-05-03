const db = require('../../data/dbConfig');

module.exports = {
    clearAlbumTracks,
    clearAlbumArtists,
    clearTrackArtists,
    clearTracks,
    clearArtists,
    clearAlbums,
    addAlbums,
    addArtists,
    addTracks,
    addAlbumArtists,
    addAlbumTracks,
    addTrackArtists,
    getAlbums
}

// ======== DB Delete Functions ========

function clearAlbumTracks(){
    return db('AlbumTracks').where('albumId', '!=', '0').del();
}

function clearAlbumArtists(){
    return db('AlbumArtists').where('albumId', '!=', '0').del();
}

function clearTrackArtists(){
    return db('TrackArtists').where('trackId', '!=', '0').del();
}

function clearTracks(){
    return db('Tracks').where('id', '!=', '0').del();
}

function clearArtists(){
    return db('Artists').where('id', '!=', '0').del();
}

function clearAlbums(){
    return db('Albums').where('id', '!=', '0').del();
}

// ======== DB Insert Functions ========

function addAlbums(albums){
    return db('Albums')
        .insert(albums);
}

function addArtists(artists){
    return db('Artists')
        .insert(artists);
}

function addTracks(tracks){
    return db('Tracks')
        .insert(tracks);
}

function addAlbumArtists(albumArtists){
    return db('AlbumArtists')
        .insert(albumArtists);
}

function addAlbumTracks(albumTracks){
    return db('AlbumTracks')
        .insert(albumTracks);
}

function addTrackArtists(trackArtists){
    return db('TrackArtists')
        .insert(trackArtists);
}

// ======== DB Select Functions ========

function getAlbums(){
    return db('Albums');
}