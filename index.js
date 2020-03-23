const express = require('express');
const cors = require('cors')
const server = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// const bcrypt = require('bcryptjs');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cors());

let data = [
    {
        id: 1,
        firstName: 'Josiah',
        lastName: 'Roa',
        email: 'josiahroa18@gmail.com',
        link: 'test.com'
    },
    {
        id: 2,
        firstName: 'Ean',
        lastName: 'Kramer',
        email: 'ean_kramer@gmail.com',
        link: 'test.com'
    },
    {
        id: 3,
        firstName: 'Jonah',
        lastName: 'Tuska',
        email: 'jonah_tuska@gmail.com',
        link: 'test.com'
    }
]

// server.get('/', (req, res) => {
//     res.send(data);
// });

// server.get('/test', (req, res) => {
//     res.send('Working');
// })

// server.post('/', (req, res) => {
//     let data = [...data, req.body];
//     res.status(200).send('Succesful post!');
// })

server.get('/spotify', (req, res) => {
    let scopes = 'user-read-private user-read-email';
    let redirect_uri = 'https://www.facebook.com/';
    res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + process.env.CLIENT_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
})

server.listen(5000, () => {
    console.log('listening on port 5000');
})


