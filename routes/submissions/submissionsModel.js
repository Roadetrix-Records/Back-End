const db = require('../../data/dbConfig');

module.exports = {
    get,
    add,
    del,
    checkId
}

function get(){
    return db('Submissions');
}

function add(submission){
    return db('Submissions')
        .insert(submission);
}

function del(id){
    return db('Submissions')
        .where({ id })
        .del();
}

function checkId(id){
    return db('Submissions')
        .where({ id })
        .first();
}