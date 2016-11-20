/*eslint no-underscore-dangle:0*/
'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const crypto = require('crypto');
const atonic = require('atonic');
const slug = require('slug');
const shortid = require('shortid');

function sha1(value) {
	return crypto.createHash('sha1').update(value).digest('hex').toLowerCase();
}

function md5(value) {
	return crypto.createHash('md5').update(value).digest('hex').toLowerCase();
}

function isNull(target) {
	return [undefined, null].indexOf(target) > -1;
}

function isNotNull(target) {
	return !isNull(target);
}

function mongoGetItem(data, nofields) {

	function mapItem(item) {
		return mongoGetItem(item, nofields);
	}

	const _id = data._id;

	data = isNotNull(data.toObject) ? data.toObject() : data;
	for (let prop in data) {
		if (prop === 'id' && _.isNumber(_id)) {
			data[prop] = parseInt(data[prop]);
		} else if (data[prop] === null || nofields.indexOf(prop) > -1) {
			delete data[prop];
		} else if (Array.isArray(data[prop])) {
			data[prop] = data[prop].map(mapItem);
		}
	}
	return data;
}

function mongoGet(data, nofields) {
	nofields = nofields || ['_id', '__v'];
	if (!Array.isArray(nofields)) {
		nofields = [nofields];
	}

	if (data && data.toObject) {
		return mongoGetItem(data, nofields);
	}
	if (data && Array.isArray(data)) {
		return data.map(function(item) {
			return mongoGetItem(item, nofields);
		});
	}
	return data;
}

exports.mongoGet = mongoGet;
exports.isNotNull = isNotNull;
exports.isNull = isNull;
exports.Promise = Promise;
exports._ = _;
exports.sha1 = sha1;
exports.md5 = md5;
exports.atonic = atonic;
exports.slug = function(s) {
	return slug(atonic(s));
};
exports.shortid = shortid.generate;
