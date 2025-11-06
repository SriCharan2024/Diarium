var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost:27017/ngn-db';
if(process.env.NODE_ENV === 'production') {
	dbURI = process.env.MONGODB_URI;
}

// MongoDB connection options for compatibility
var options = {
	server: {
		socketOptions: {
			keepAlive: 1,
			connectTimeoutMS: 30000
		}
	}
};

// Connect to MongoDB with options
mongoose.connect(dbURI, options);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
	console.log('✅ Mongoose connected to ' + dbURI);
	console.log('Database: ngn-db');
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
	console.log('');
	console.log('⚠️  MongoDB Connection Failed!');
	console.log('Possible reasons:');
	console.log('  1. MongoDB is not installed on your system');
	console.log('  2. MongoDB service is not running');
	console.log('  3. MongoDB is running on a different port');
	console.log('');
	console.log('To fix this:');
	console.log('  - Install MongoDB: https://www.mongodb.com/try/download/community');
	console.log('  - Start MongoDB service: mongod');
	console.log('  - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas');
	console.log('');
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

// APP TERMINATION/RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

// For nodemon restarts
process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// For app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});

// For Heroku app termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app termination', function() {
		process.exit(0);
	});
});

// BRING IN YOUR SCHEMAS AND MODELS
require('../models/User');
require('../models/Note');
require('../models/Label');
