var movies = require('../helpers/couchdb').use('movies');

exports.create = function createMovie(movie, cb) {
    movie.createdAt = Date.now();
    movies.insert(movie, null /* let couchdb generate an id */ , cb);
};



exports.list = function listMovies(cb) {
    movies.list({}, function(err, body) {
        if (!err) {
            cb(null,body.rows);
        }
        else {
            console.log("Error: " + err)
        }
      });
};

exports.get = function getMovie(movieId, cb) {
    movies.fetch({movieId}, function(err, body) {
        if (!err) {
            cb(null,body);
        }
        else {
            console.log("Error: " + err)
        }
    });
    /*movies.view(
        'by_id', 'by_id', {keys: [movieId], include_docs: true},
        function(err,result) {
            if (err) {
                throw err;
            } 
            else {
                result = result.rows.map(function(row) {
                  return row.doc;
                });
                cb(null, result);
              }
        }
      );*/
};