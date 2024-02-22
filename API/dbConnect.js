'use strict';

const Mongoose  = require("mongoose");

const uri = process.env.DB_URI

// Connect to MongoDB
Mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch(error => console.log('MongoDB Error:', error.message));

// Get the default connection
const db = Mongoose.connection;

// Bind connection to error event (to get notification ofconnection errors)
db.on("error", console.error.bind(console, "MongoDBconnection error:"));

exports.Mongoose = Mongoose;