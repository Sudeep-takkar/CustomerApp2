# CustomerApp2

1. app.js is the script which will be saving 10000 records into the Bill collection with the following details:
2. server.js is the script which is merging the map reducing the collections Bill and customer to form a new collection customers_Bill
   with the following data structure:

    _id    : String,
    value : [
     {
    Mobile    : String,
    Phone : String,
    Address: [
    {FlatNo: Number, Street: Number, State: String, PinCode: Number }
    ],
    DOB: Date,
    Email: String
	},
	{
	 BillNumber    : Number,
    BillDate    : Date,
    Discount : Number,
    Items: [
    {Name: String, Quantity: Number, Rate: Number }
    ],
    Tax: Number
	}
    ]

