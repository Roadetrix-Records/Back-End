const express = require('express');
const router = express.Router();
const Playlist = require('../data/models/playlistModel');
const authenticator = require('../utils/authenticator');

router.post('/', authenticator, async(req, res) => {
    try {
        await Playlist.clearPlaylists();
    }
    catch {
        return res.status(500).json({ message: 'Error clearing database' });
    }

    try{
        console.log(req.body)
        await Playlist.setPlaylists(req.body);
        return res.status(201).json({ message: 'Succesfully added data to database', data: req.body });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error adding playlists to database',
            error: error
        })
    }
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
