const express = require('express');
const router = express.Router();
const Spotify = require('./spotifyModel');

router.get('/', (req, res) => {
    res.status(201).json({ message: 'connected!' });
})

router.post('/data', async (req, res) => {
    
    // Clear current data base
    try {
        await Spotify.clearAlbumTracks();
        await Spotify.clearAlbumArtists();
        await Spotify.clearTrackArtists();
        await Spotify.clearTracks();
        await Spotify.clearArtists();
        await Spotify.clearAlbums();
    }
    catch {
        return res.status(500).json({ message: 'Error clearing database' });
    }

    // Add all new information to data base
    try {
        await Spotify.addAlbums(req.body.albums);
        await Spotify.addArtists(req.body.artists);
        await Spotify.addTracks(req.body.tracks);
        await Spotify.addAlbumArtists(req.body.albumArtists);
        await Spotify.addAlbumTracks(req.body.albumTracks);
        await Spotify.addTrackArtists(req.body.trackArtists);
        return res.status(201).json({ message: 'Successfully added data to database' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding data to database' , error: error })
    }
})

router.get('/data/albums', (req, res) => {
    Spotify.getAlbums()
    .then(albums => {
        res.status(201).json(albums);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;