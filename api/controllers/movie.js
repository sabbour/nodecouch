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
    movies.list(
        function (err, rows) {
            if (err) {
                res.status(400).json({
                    message: err.message
                });
            } else {
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
    movies.get(id, function (err, movie) {
        if (err) {
            res.status(400).json({
                message: err.message
            });
        } else {
            console.log('movie ' + id + ' retrieved');
            res.json(movie);
        }
    });
}

//POST /movie operationId
function save(req, res, next) {
    movies.create(req.body, function (err) {
        if (err) {
            res.status(400).json({
                message: err.message
            });
        } else {
            console.log('movie inserted');
            res.json({
                success: 1,
                description: "Movie added to the list!"
            });
        }
    });
}