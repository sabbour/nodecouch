var couch = require('./couchdb');

couch.db.create(dbname, function(err) {  
  if (err && err.statusCode != 412) {
    console.error(err);
  }
  else {
    console.log('database ' + dbname +' exists');
  }
});