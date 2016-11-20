'use strict';

const Model = require('./model');
const utils = require('./utils');
const _ = utils._;
const Promise = utils.Promise;

module.exports = class Vote extends Model {
	constructor(db) {
		super(db, 'Vote');
	}

	onCreating(data) {
		data = Vote.normalizeCreate(data);
		data._id = Vote.createId(data);

		return Promise.resolve(data);
	}

	onUpdating(data) {
		data = Vote.normalizeUpdate(data);

		return Promise.resolve(data);
	}

	static normalizeCreate(data) {
		data = _.pick(data, 'questionId', 'answerId', 'userId', 'userIp', 'userGender', 'userLang');

		return data;
	}

	static normalizeUpdate(data) {
		data = _.pick(data, 'id');

		return data;
	}

	static createId(data) {
		return utils.md5([data.answerId.trim(), data.userId.trim()].join('|'));
	}
};
