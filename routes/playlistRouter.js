const express = require('express');
const router = express.Router();
const Playlist = require('../data/models/playlistModel');
const authenticator = require('../utils/authenticator');

router.put('/', (req, res) => {
    console.log(req.body);

    Playlist.updatePlaylist({
        id: req.body.id,
        url: req.body.url,
        playlistId: req.body.playlistId,
        img: req.body.img,
        privateUrl: req.body.privateUrl
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
