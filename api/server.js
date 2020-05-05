const express = require('express');
const cors = require('cors');
require('dotenv').config();

const spotifyRouter = require('../routes/spotify/spotifyRouter');
const submissionsRouter = require('../routes/submissions/submissionsRouter');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/spotify', spotifyRouter);
server.use('/submissions', submissionsRouter);

module.exports = server;