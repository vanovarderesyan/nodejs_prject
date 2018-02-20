const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/models');

module.exports = db;