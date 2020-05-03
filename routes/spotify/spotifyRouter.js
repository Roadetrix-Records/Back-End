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

// router.get('/data/albums', (req, res) => {
//     Spotify.getAlbums()
//     .then(albums => {
//         res.status(201).json(albums);
//     })
//     .catch(err => {
//         res.status(500).json(err);
//     })
// })

/*
    Returns latest release
    If album
        Expect multiple artists
        Expect multiple tracks
    If track
        Expect multiple artists
        Expect single track
    Return {
        albumName,
        tracks: [
            {
                name,
                imgUrl,
                privateUrl,
                publicUrl
            }
        ],
        artists: [
            {
                name,
                imgUrl,
                privateUrl,
                publicUrl
            }
        ],
        albumImgUrl,
        publicUrl
        privateUrl,
        releaseDate,
        isAlbum: true || false
    }
*/
router.get('/latest-4', async (req, res) => {
    // Get latest albums
    // Get artists per album
    // Get tracks per album
    try {
        const albums = await Spotify.getLatest4();
        const returnData = [];
        for(let i=0; i < albums.length; i++){
            returnData.push({
                albumId: albums[i].id,
                albumName: albums[i].name,
                tracks: [],
                artists: [],
                albumImgUrl: albums[i].imgUrl,
                albumPublicUrl: albums[i].externalUrl,
                albumPrivateUrl: albums[i].privateUrl,
                albumReleaseDate: albums[i].releaseDate
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

module.exports = router;