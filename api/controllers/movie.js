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
    var telemetryClient = req.app.get('telemetryClient');
    movies.list(
        function (err, rows) {
            if (err) {
                telemetryClient.trackException({exception: new Error(err.message)});
                res.status(400).json({
                    message: err.message
                });
            } else {
                telemetryClient.trackEvent({name: "retrieve movies"});                
                console.log('movies retrieved');
                res.json({
                    movies: rows
                });
            }
        });
}

//GET /movie/{id} operationId
function getOne(req, res, next) {
    var telemetryClient = req.app.get('telemetryClient');    
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    movies.get(id, function (err, movie) {
        if (err) {
            telemetryClient.trackException({exception: new Error(err.message)});            
            res.status(400).json({
                message: err.message
            });
        } else {
            telemetryClient.trackEvent({name: "retrieve movie", properties: {id: id}});            
            console.log('movie ' + id + ' retrieved');
            res.json(movie);
        }
    });
}

//POST /movie operationId
function save(req, res, next) {
    var telemetryClient = req.app.get('telemetryClient');    
    movies.create(req.body, function (err) {
        telemetryClient.trackException({exception: new Error(err.message)});        
        if (err) {
            res.status(400).json({
                message: err.message
            });
        } else {
            telemetryClient.trackEvent({name: "insert movie", properties: {name: req.body.name}});
            console.log('movie inserted');
            res.json({
                success: 1,
                description: "Movie added to the list!"
            });
        }
    });
}