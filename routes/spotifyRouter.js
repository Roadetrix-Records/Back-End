const express = require('express');
const router = express.Router();
const Spotify = require('../data/models/spotifyModel');
const authenticator = require('../utils/authenticator');

router.get('/', (req, res) => {
    res.status(201).json({ message: 'connected!' });
})

router.post('/data', authenticator, async (req, res) => {
    
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

router.get('/latest-6', async (req, res) => {
    try {
        const albums = await Spotify.getLatest6();
        const returnData = [];
        for(let i=0; i < albums.length; i++){
            returnData.push({
                albumId: albums[i].id,
                albumName: albums[i].name,
                albumImgUrl: albums[i].imgUrl,
                albumPublicUrl: albums[i].externalUrl,
                albumPrivateUrl: albums[i].privateUrl,
                albumReleaseDate: albums[i].releaseDate,
                tracks: [],
                artists: []
            })
            // For artists per album => get artist object
            let artists = await Spotify.getArtistsIdByAlbum(albums[i].id);
            for(let k=0; k<artists.length; k++){
                let artist = await Spotify.getArtistById(artists[k].artistId);
                returnData[i].artists.push({
                    artistId: artist.id,
                    artistName: artist.name,
                    artistImgUrl: artist.imgUrl,
                    artistPublicUrl: artist.externalUrl,
                    artistPrivateUrl: artist.privateUrl
                })
            }
            // For tracks per album => get track object
            let tracks = await Spotify.getTracksIdByAlbum(albums[i].id);
            for(let k=0; k<tracks.length; k++){
                let track = await Spotify.getTrackById(tracks[k].trackId);
                let trackArtistIds = await Spotify.getArtistsByTrack(track.id);
                let trackArtists = [];
                // console.log(trackArtistIds);
                for(j=0; j<trackArtistIds.length; j++){
                    let trackArtist = await Spotify.getArtistById(trackArtistIds[j].artistId);
                    trackArtists.push(trackArtist);
                }
                returnData[i].tracks.push({
                    trackId: track.id,
                    trackName: track.name,
                    trackPublicUrl: track.externalUrl,
                    trackPrivateUrl: track.privateUrl,
                    artists: [...trackArtists]
                })
            }
            if(returnData[i].tracks.length > 1){
                returnData[i].isAlbum = true;
            }else{
                returnData[i].isAlbum = false;
            }
        }
        res.status(200).json(returnData);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/albums', (req, res) => {
    Spotify.getAlbums()
    .then(albums => {
        res.status(200).json(albums);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/release-data/:id', async (req, res) => {
    try {
        const album = await Spotify.getAlbumById(req.params.id);
        const returnData = {
            albumId: album.id,
            albumName: album.name,
            albumImgUrl: album.imgUrl,
            albumPublicUrl: album.externalUrl,
            albumPrivateUrl: album.privateUrl,
            albumReleaseDate: album.releaseDate,
            tracks: [],
            artists: []
        }

        let artists = await Spotify.getArtistsIdByAlbum(album.id);
        for(let i=0; i<artists.length; i++){
            let artist = await Spotify.getArtistById(artists[i].artistId);
            returnData.artists.push({
                artistId: artist.id,
                artistName: artist.name,
                artistImgUrl: artist.imgUrl,
                artistPublicUrl: artist.externalUrl,
                artistPrivateUrl: artist.privateUrl
            })
        }
        // For tracks per album => get track object
        let tracks = await Spotify.getTracksIdByAlbum(album.id);
        for(let i=0; i<tracks.length; i++){
            let track = await Spotify.getTrackById(tracks[i].trackId);
            let trackArtistIds = await Spotify.getArtistsByTrack(track.id);
            let trackArtists = [];
            // console.log(trackArtistIds);
            for(j=0; j<trackArtistIds.length; j++){
                let trackArtist = await Spotify.getArtistById(trackArtistIds[j].artistId);
                trackArtists.push(trackArtist);
            }
            returnData.tracks.push({
                trackId: track.id,
                trackName: track.name,
                trackPublicUrl: track.externalUrl,
                trackPrivateUrl: track.privateUrl,
                artists: [...trackArtists]
            })
        }
        if(returnData.tracks.length > 1){
            returnData.isAlbum = true;
        }else{
            returnData.isAlbum = false;
        }

        res.status(200).json(returnData);
    }
    catch(err){
        res.status(500).json(err);
    }

})

module.exports = router;