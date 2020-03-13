const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

app.get('/', (req, res) => {
    res.send(data);
});

app.get('/test', (req, res) => {
    res.send('Working');
})

app.post('/', (req, res) => {
    let data = [...data, req.body];
    res.status(200).send('Succesful post!');
})

app.listen(5000, () => {
    console.log('listening on port 5000');
})