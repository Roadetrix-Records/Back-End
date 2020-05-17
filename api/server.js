const express = require('express');
const cors = require('cors');
require('dotenv').config();

const spotifyRouter = require('../routes/spotifyRouter');
const submissionsRouter = require('../routes/submissionsRouter');
const authRouter = require('../routes/authRouter');
const playlistRouter = require('../routes/playlistRouter');

const authenticator = require('../utils/authenticator');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/spotify', spotifyRouter);
server.use('/submissions', submissionsRouter);
server.use('/auth', authRouter);
server.use('/playlists', playlistRouter);

module.exports = server;