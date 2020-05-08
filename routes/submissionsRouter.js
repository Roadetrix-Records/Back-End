const express = require('express');
const router = express.Router();
const Submission = require('../data/models/submissionsModel');

router.get('/', (req, res) => {
    Submission.get()
    .then(submissions => {
        res.status(200).json(submissions);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/', submissionExists, validateLength, (req, res) => {
    Submission.add(req.body)
    .then(() => {
        res.status(201).json({
            message: 'Successfully submitted demo.'
        })
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.delete('/:id', idExists, (req, res) => {
    Submission.del(req.params.id)
    .then(() => {
        res.status(200).json({
            message: 'Submission successfully deleted'
        })
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// Check if the data in the body exists
function submissionExists(req, res, next){
    const data = req.body;
    if(data.firstName || data.lastName || data.email || data.demoLink){
        next();
    }else{
        res.status(400).json({
            message: 'Missing field'
        })
    }
}

// Check that the data in the body follows restraints
function validateLength(req, res, next){
    const data = req.body;
    if(data.firstName.length <= 26 && data.lastName.length <= 26 && data.email.length <= 320){
        next();
    }else{
        res.status(400).json({
            message: 'Length too long on one of the fields'
        })
    }
}

// Check that the id exists
function idExists(req, res, next){
    Submission.checkId(req.params.id)
    .then(submission => {
        if(submission){
            next();
        }else{
            res.status(404).json({
                message: 'Submission with id does not exist'
            })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

module.exports = router;