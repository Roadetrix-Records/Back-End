const express = require('express');
const router = express.Router();
const Playlist = require('../data/models/playlistModel');

router.post('/', (req, res) => {
    const url = req.body.link;
    // Extract playlist id from url
    let playlistId = '';
    // Look for the word playlist, once
    for(let i=0; i<url.length; i++){
        
    }
})

module.exports = router;
