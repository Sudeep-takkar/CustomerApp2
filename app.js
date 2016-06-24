var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/Customer';

function getRandomItem(){

	var favorites = ["Hakka Noodles","Mutton", "Butter Chicken", "Coke", "Sweet Corns", "Soyabean","Milk Shake","Butter Naan","Chaap","Red Bull"];
	//var favorite = favorites[Math.floor(Math.random() * favorites.length)];
    var i = parseInt(Math.random()*(favorites.length-1));
    return favorites[i];
};

var insertDocument = function(db) {

     var xx;

	for( i=1 ; i<10000 ; i++) {
	  	db.collection("customers").find({}, {'_id': true}).toArray(function(err, results) {
	    var x = parseInt(Math.random()*(results.length-1));
	    xx = "i "+ i +" "+results[x]._id;
	    console.log(xx);
         });
	   //console.log(id);
       db.collection('Bill').insertOne( {
      "BillNumber" : i,
      "Billdate" : Date.now(),
      "Discount" : Math.random() * (15 - 5) + 5,
      "Tax" : 15,
      "Items" :
         {
            "Name" : getRandomItem(),
            "Quantity" : 2,
            "Rate" : 11.9
         },
      "Customer_id" : "abc"
   }, function(err, result) {
    assert.equal(err, null);

  });
}
    console.log("Inserted a document into the restaurants collection.");
};


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      
  });
});
