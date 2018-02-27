'use strict';

// To communicate with CouchDB
var request = require('request')

// Load the Movies model
var movies = require('../models/movies');

// Exports all the functions to perform on the db
module.exports = {
    getAll,
    save,
    getOne
};

//GET /movie operationId
function getAll(req, res, next) {
    var listOfMovies = movies.list(
        function (err, rows) {
            if (err) {
                throw err;
            }
            else {
                console.log('movies retrieved');
                res.json({
                    movies: rows
                });
            }
        });
}

//GET /movie/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var movie = movies.get(id, function () {
        if (movie) {
            res.json(movie);
        } else {
            res.status(204).send();
        }
    });
}

//POST /movie operationId
function save(req, res, next) {

    var movie = {
        name: 'Jurassic Park',
        genre: 'Thriller'
    };

    movies.create(movie, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('movie inserted');
            res.json({
                success: 1,
                description: "Movie added to the list!"
            });
        }
    });
}