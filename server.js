const express = require('express');
const spotifyRouter = require('./routes/spotify/spotifyApi');
const cors = require('cors');

const server = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());
server.use('/spotify', spotifyRouter);

server.listen(port, () => {
    console.log(`listening on port ${port}`);
})


