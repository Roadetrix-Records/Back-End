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

router.get('/latest', async (req, res) => {
    const MAX_ALBUMS = 5;
    const returnData = [];
    try {
        const { featuredId } = await Spotify.getFeatured();
        const albums = await Spotify.getAlbums();

        const albumArtists = {};
        const albumTracks = {};
        // const trackArtists = {};

        // Gather album data
        // Check to see if we've reached the end of albums
        for(let i=0; returnData.length < MAX_ALBUMS; i++){
            if(i === albums.length - 1){ // Make sure we haven't gone pass the length of albums in the db
                break;
            } else {
                if(!albums[i].isHidden && albums[i].id !== featuredId){
                    /**
                     * Create an object for key=album_id, value=[artist_id]
                     * {
                     *  albumId: [artist_id],
                     *  ...
                     * }
                     */
                    albumArtists[albums[i].id] = await Spotify.getArtistsIdByAlbum(albums[i].id);

                    /**
                     * Create an object for key=album_id, value=[track_id]
                     * {
                     *  albumId: [track_id],
                     *  ...
                     * }
                     */
                    albumTracks[albums[i].id] = await Spotify.getTracksIdByAlbum(albums[i].id);

                    returnData.push({
                        albumId: albums[i].id,
                        albumName: albums[i].name,
                        albumImgUrl: albums[i].imgUrl,
                        albumPublicUrl: albums[i].externalUrl,
                        albumPrivateUrl: albums[i].privateUrl,
                        albumReleaseDate: albums[i].releaseDate,
                        isHidden: albums[i].isHidden,
                        artists: [],
                        tracks: []
                    })
                }
            }
        }

        for(let i=0; i<returnData.length; i++){
            const albumId = returnData[i].albumId;
            for(let j=0; j<albumArtists[albumId].length; j++){
                const artist = await Spotify.getArtistById(albumArtists[albumId][j].artistId)
                returnData[i].artists.push({
                    artistId: artist.id,
                    artistName: artist.name,
                    artistImgUrl: artist.imgUrl,
                    artistPublicUrl: artist.externalUrl,
                    artistPrivateUrl: artist.privateUrl
                })
            }
            for(let j=0; j<albumTracks[albumId].length; j++){
                const track = await Spotify.getTrackById(albumTracks[albumId][j].trackId)
                // trackArtists[track.id] = await Spotify.getArtistsByTrack(track.id);
                returnData[i].tracks.push({
                    trackId: track.id,
                    trackName: track.name,
                    trackPublicUrl: track.externalUrl,
                    trackPrivateUrl: track.privateUrl,
                    duration: track.duration,
                    explicit: track.explicit,
                    previewUrl: track.previewUrl
                });
            }
        }
        // FUTURE FEATURE - Add the artists the wrote each track
        // console.log(trackArtists);
        // for(let i=0; i<returnData.length; i++){
        //     for(let j=0; j<returnData[i].tracks.length; j++){
        //         const trackId = returnData[i].tracks[j]
        //         const artist = await Spotify.getArtistById(trackArtists[])

        //     }
        // }
        
        res.status(200).json(returnData);
    }
    catch(err){
        res.status(500).json({
            message: 'There was an error fetching the data from the database',
            error: err
        });
    }
})

router.get('/releases', async (req, res) => {
    const returnData = [];
    try{
        const albums = await Spotify.getAlbums();
        const albumArtists = {};
        const albumTracks = {};
        for(let i=0; i<albums.length; i++){
            /**
             * Create an object for key=album_id, value=[artist_id]
             * {
             *  albumId: [artist_id],
             *  ...
             * }
             */
            albumArtists[albums[i].id] = await Spotify.getArtistsIdByAlbum(albums[i].id);

            /**
             * Create an object for key=album_id, value=[track_id]
             * {
             *  albumId: [track_id],
             *  ...
             * }
             */
            albumTracks[albums[i].id] = await Spotify.getTracksIdByAlbum(albums[i].id);

            returnData.push({
                albumId: albums[i].id,
                albumName: albums[i].name,
                albumImgUrl: albums[i].imgUrl,
                albumPublicUrl: albums[i].externalUrl,
                albumPrivateUrl: albums[i].privateUrl,
                albumReleaseDate: albums[i].releaseDate,
                isHidden: albums[i].isHidden,
                artists: [],
                tracks: []
            })
        }

        for(let i=0; i<returnData.length; i++){
            const albumId = returnData[i].albumId
            for(let j=0; j<albumArtists[albumId].length; j++){
                const artist = await Spotify.getArtistById(albumArtists[albumId][j].artistId)
                returnData[i].artists.push({
                    artistId: artist.id,
                    artistName: artist.name,
                    artistImgUrl: artist.imgUrl,
                    artistPublicUrl: artist.externalUrl,
                    artistPrivateUrl: artist.privateUrl
                })
            }
            for(let j=0; j<albumTracks[albumId].length; j++){
                const track = await Spotify.getTrackById(albumTracks[albumId][j].trackId)
                // trackArtists[track.id] = await Spotify.getArtistsByTrack(track.id);
                returnData[i].tracks.push({
                    trackId: track.id,
                    trackName: track.name,
                    trackPublicUrl: track.externalUrl,
                    trackPrivateUrl: track.privateUrl,
                    duration: track.duration,
                    explicit: track.explicit,
                    previewUrl: track.previewUrl
                });
            }
        }

        res.status(200).json(returnData);
    }catch(err){
        res.status(500).json({
            message: 'There was an error fetching the data from the database',
            error: err
        })
    }
})

router.put('/set-hidden/:id', (req, res) => {
    Spotify.setHidden(req.params.id, req.body.isHidden)
    .then(() => {
        res.status(201).json({ message: 'Successfully updated' });
    })
    .catch(err => {
        res.status(500).json({ 
            message: 'Error updating isHidden value',
            error: err
        })
    })
})

router.get('/last-fetch', (req, res) => {
    Spotify.getLastFetch()
    .then(lastFetch => {
        res.status(200).json(lastFetch);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    })
})

router.put('/last-fetch', (req, res) => {
    Spotify.setLastFetch(req.body.date)
    .then(() => {
        res.status(201).json({ message: 'Successfully updated latest fetch date' });
    })
    .catch(err => {
        res.status(500).json({ error: err });
    })
})

router.put('/set-featured/:id', (req, res) => {
    Spotify.setFeatured(req.params.id)
    .then(() => {
        res.status(201).json({ message: 'Successfully updated featured release' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
})

router.get('/admin-featured', async(req, res) => {
    try{
        let { albumId } = await Spotify.getFeatured();
        let release = await Spotify.getAlbumById(albumId);
        res.status(200).json(release);
    }
    catch(err){
        res.status(500).json({ message: err });
    }
})

router.get('/featured', async(req, res) => {
    try {
        const {albumId} = await Spotify.getFeatured();
        const album = await Spotify.getAlbumById(albumId);
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
                artists: [...trackArtists],
                duration: track.duration,
                explicit: track.explicit,
                previewUrl: track.previewUrl
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