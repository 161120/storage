'use strict';

const db = require('./db');
const mongoose = require('mongoose');

exports.Question = require('./question');
exports.Answer = require('./answer');
exports.Vote = require('./vote');

exports.mongoose = mongoose;
exports.db = db;
exports.connect = (connectionString, options, cb) => {
	return mongoose.createConnection(connectionString, options, cb);
};
