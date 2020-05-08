const express = require('express');
const cors = require('cors');
require('dotenv').config();

const spotifyRouter = require('../routes/spotifyRouter');
const submissionsRouter = require('../routes/submissionsRouter');
const authRouter = require('../routes/authRouter');

const authenticator = require('../utils/authenticator');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/spotify', spotifyRouter);
server.use('/submissions', submissionsRouter);
server.use('/auth', authRouter);

module.exports = server;