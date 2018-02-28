'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var initCouch = require('./api/helpers/init_couch');
const appInsights = require("applicationinsights");
appInsights.setup()
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .start();

var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

initCouch(function(err) {  
  if (err) {
    throw err
  }
  else {
    console.log('couchdb initialized');
  }
});

// Configure App Insights
app.set('telemetryClient', appInsights.defaultClient);

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // add swagger-ui
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 8080;
  app.listen(port);
});
