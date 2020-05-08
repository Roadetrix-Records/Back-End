const db = require('../dbConfig');

module.exports = {
    getByUsername
}

function getByUsername(username){
    return db('Admins')
        .where({username})
        .first();
}