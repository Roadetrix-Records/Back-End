const express = require('express');
const router = express.Router();
const Playlist = require('../data/models/playlistModel');

router.put('/', (req, res) => {
    const url = req.body.link;
    const id = req.body.id

    let parts = url.split('/');
    let playlistId = parts[parts.length - 1];

    Playlist.updatePlaylist({
        id,
        url,
        playlistId
    })
    .then(() => {
        res.status(200).json({
            message: 'Playlist update successful'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error updating playlists in database',
            error: err
        })
    })
})

router.get('/', (req, res) => {
    Playlist.getPlaylists()
    .then(playlists => {
        res.status(200).json(playlists);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error getting playlists from database',
            error: err
        })
    })
})

module.exports = router;
