const db = require('../dbConfig');
const { where } = require('../dbConfig');

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
    getLatest,
    getArtistsIdByAlbum,
    getTracksIdByAlbum,
    getArtistsByTrack,
    getArtistById,
    getTrackById,
    getAlbums,
    getAlbumById,
    setHidden,
    getLastFetch,
    setLastFetch,
    setFeatured,
    getFeatured
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

// ======== DB Get Latest Releases ========
function getLatest(limit){
    return db('Albums')
        .orderBy('releaseDate', 'desc')
        .limit(limit);
}

function getArtistsIdByAlbum(albumId){
    return db.select('artistId')
        .from('AlbumArtists')
        .where({albumId});
}

function getTracksIdByAlbum(albumId){
    return db.select('trackId')
        .from('AlbumTracks')
        .where({albumId});
}

function getArtistsByTrack(trackId){
    return db.select('artistId')
        .from('TrackArtists')
        .where({trackId})
}

function getArtistById(artistId){
    return db('Artists')
        .where('id', artistId).first();
}

function getTrackById(trackId){
    return db('Tracks')
        .where('id', trackId).first();
}

// ======== DB Get All Albums ========
function getAlbums(){
    return db('Albums')
        .orderBy('releaseDate', 'desc')
}

// ======== DB Get Album by id ========
function getAlbumById(id){
    return db('Albums')
        .where({id})
        .first();
}

// ======== DB Update Hidden ========
function setHidden(id, isHidden){
    return db('Albums')
        .where({id})
        .first()
        .update({isHidden})
}

// ======== DB Latest Fetch ========
function setLastFetch(date){
    return db('LastFetch')
        .where('id', 1)
        .update({date});
}

function getLastFetch(){
    return db('LastFetch')
        .where('id', 1)
        .first();
}

// ======== DB Featured ========
function setFeatured(albumId){
    return db('FeaturedAlbum')
        .where('id', 1)
        .update({albumId});
}

function getFeatured(){
    return db('FeaturedAlbum')
        .where('id', 1)
        .first();
}


