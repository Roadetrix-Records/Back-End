const db = require('../dbConfig');

module.exports = {
    getPlaylists,
    updatePlaylist
}

function getPlaylists(){
    return db('Playlists');
}

function updatePlaylist(obj){
    return db('Playlists')
        .where('id', obj.id)
        .update({
            url: obj.url,
            playlistId: obj.playlistId
        })
}