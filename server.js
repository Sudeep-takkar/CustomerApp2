var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/Customer';

var mapCustomer, mapBill, reduce;

mapCustomer = function() {
    var values = {

    Name    : this.Name,
    Mobile    : this.Mobile,
    Phone : this.Phone,
    Address: [
    {FlatNo: this.FlatNo, Street: this.FlatNo, State: this.FlatNo, PinCode: this.PinCode }
    ],
    DOB: this.DOB,
    Email: this.Email
    };
    emit(this._id, values);
};
mapBill = function() {
    var values = {
    BillId : this._id,
    BillNumber  : this.BillNumber,
    BillDate   : this.BillDate,
    Discount    : this.Discount,
    Items: [
    {Name: this.Name, Quantity: this.Name, Rate: this.Name }
    ],
    Tax         : this.Tax
    };
    emit(this.Customer_id, values);
};


reduce = function(k, values) {
    var result = {}, billFields = {
    	"_id" : '',
    	"BillDate"   : '',
    "BillNumber"  : '',
    "Discount"    : '',
     "Items": [
    {"Name": '', "Quantity": '', "Rate": '' }
    ],
    "Tax"         : ''
    };
    values.forEach(function(value) {
        var field;
        if ("Discount" in value) {
            if (!("Bill" in result)) {
                result.Bill = [];
            }
            result.Bill.push(value);
        } else if ("Bill" in value) {
            if (!("Bill" in result)) {
                result.Bill = [];
            }
            result.Bill.push.apply(result.Bill, value.Bill);
        }
        for (field in value) {
            if (value.hasOwnProperty(field) && !(field in billFields)) {
                result[field] = value[field];
            }
        }
    });
    return result;
};


MongoClient.connect(url, function(err, db) {
 

db.collection("customers").mapReduce(mapCustomer, reduce, {"out": {"reduce": "customers_Bill"}});
db.collection("Bill").mapReduce(mapBill, reduce, {"out": {"reduce": "customers_Bill"}});
console.log("mapReduce done");

});
