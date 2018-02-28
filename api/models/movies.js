var movies = require('../helpers/couchdb').use('movies');

exports.create = function createMovie(movie, cb) {
    movie.createdAt = Date.now();
    movies.insert(movie, null /* let couchdb generate an id */ , cb);
};

exports.list = function listMovies(cb) {
    movies.list({include_docs: true}, function(err, body) {
        if (!err) {
            var docs = [];
            body.rows.forEach(function(doc) {
                docs.push(doc.doc);
            });
            cb(null,docs);
        }
        else {
            console.log("Error: " + err)
            cb(err,null);
        }
      });
};

exports.get = function getMovie(id, cb) {
    movies.get(id, { revs_info: false }, function(err, body) {
        if (!err) {
            console.log("Movie: " + JSON.stringify(body));
            cb(null,body);
        }
        else {
            console.log("Error: " + err)
            cb(err,null);
        }
    });
};