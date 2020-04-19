const express = require('express');
const router = express.Router();
const Spotify = require('./spotifyModel');

router.get('/', (req, res) => {
    res.status(201).json({ message: 'connected!' });
})

router.post('/data', async (req, res) => {
    // Clear current data base
    await Spotify.clearAlbumTracks();
    await Spotify.clearAlbumArtists();
    await Spotify.clearTracks();
    await Spotify.clearArtists();
    await Spotify.clearAlbums();

    // Add all new information to data base
    
})

module.exports = router;