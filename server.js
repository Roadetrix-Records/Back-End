const express = require('express');
const cors = require('cors');
const server = express();

// OAuth setup
const querystring = require('querystring');
let request = require('request')

require('dotenv').config();

const PORT = 5000;
let redirect_uri = `http://localhost:${PORT}/callback`;

server.use(cors());

// server.get('/spotify', (req, res) => {
//     res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//         response_type: 'code',
//         client_id: process.env.CLIENT_ID,
//         scope: 'user-read-private user-read-email',
//         redirect_uri
//     }));
// })

// server.get('/callback', (req, res) => {
//     let code = req.query.code || null
//     let authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//             code: code,
//             redirect_uri,
//             grant_type: 'authorization_code'
//         },
//         headers: {
//             'Authorization': 'Basic ' + (new Buffer(
//               process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
//             ).toString('base64')),
//         },
//         json: true
//     }
//     request.post(authOptions, (error, response, body) => {
//         let access_token = body.access_token
//         let uri = 'http://localhost:3000/dashboard'
//         res.redirect(uri + '?access_token=' + access_token)
//     })
// })

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})


