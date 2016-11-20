'use strict';

const db = require('./db');
const mongoose = require('mongoose');

exports.Subscriber = require('./question');
exports.Answer = require('./Answer');
exports.Vote = require('./Vote');

exports.mongoose = mongoose;
exports.db = db;
exports.connect = (connectionString, options, cb) => {
	return mongoose.createConnection(connectionString, options, cb);
};
