var mongoose = require('mongoose')
var config = require('../config')

var db = mongoose.connection;

db.on('error', function () {
	console.log('error occured from db');
});
 
db.once('open', function dbOpen() {
	console.log('successfully opened the db');
});

mongoose.connect(config.dbPath);
 
exports.mongoose = mongoose;
