const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const generateToken = require('../utils/generateToken');
const User = require('../data/models/authModel');

// Need middleware to validadting body
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.getByUsername(username)
    .then(user => {
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                const token = generateToken();
                res.status(200).json({
                    token
                })
            }else{
                res.status(401).json({
                    message: 'Invalid credentials'
                })
            }
        }else{
            res.status(404).json({
                message: 'User does not exist'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: 'Internal server error'
        });
    })

})

module.exports = router;