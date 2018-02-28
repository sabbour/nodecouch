var async = require('async');  
var couch = require('./couchdb');

var dbname = process.env.COUCHDB_NAME || 'movies'
var databases = [dbname];

module.exports = initCouch;

function initCouch(cb) {  
  createDatabases(cb);
}

function createDatabases(cb) {  
  async.each(databases, createDatabase, cb);
}

function createDatabase(db, cb) {  
  couch.db.create(db, function(err) {
    if (err && err.statusCode == 412) {
      err = null;
    }
    cb(err);
  });
}