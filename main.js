
var express       = require( 'express' );
var http           = require( 'http' );
var app    = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/Customer';
var engine = require( 'ejs-locals' );

app.engine( 'ejs', engine );
app.set( 'view engine', 'ejs' );

var Details = require('./db');
// all environments
app.set( 'port', process.env.PORT || 3001 );

// Routes
app.get(  '/',    function ( req, res, next ){

getDetailsfromDb(res);

});

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});


getDetailsfromDb = function(res){
MongoClient.connect(url, function(err, db) {
db.collection('customers').find({}, function(err, details){
    if(err){
        console.log(err);
        res.json(err);
    }
    else{
      console.log(details._id);
        res.render( 'index', {
          title : 'details',
          details : details
      });
    }
});

});
};

