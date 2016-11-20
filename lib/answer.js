'use strict';

const Model = require('./model');
const utils = require('./utils');
const _ = utils._;
const Promise = utils.Promise;

module.exports = class Answer extends Model {
	constructor(db) {
		super(db, 'Answer');
	}

	onCreating(data) {
		data = Answer.normalizeCreate(data);
		data._id = Answer.createId(data);

		return Promise.resolve(data);
	}

	onUpdating(data) {
		data = Answer.normalizeUpdate(data);

		return Promise.resolve(data);
	}

	static normalizeCreate(data) {
		data = _.pick(data, 'questionId', 'title', 'status', 'userId');

		data.slug = Answer.createSlug(data.title);
		data.slug_key = Answer.createSlugKey(data);

		return data;
	}

	static normalizeUpdate(data) {
		data = _.pick(data, 'id', 'title', 'status', 'countVotes');

		if (data.title) {
			data.slug = Answer.createSlug(data.title);
			data.slug_key = Answer.createSlugKey(data);
		}

		return data;
	}

	static createId() {
		return utils.shortid();
	}

	static createSlugKey(data) {
		return utils.md5([data.questionId.trim().toLowerCase(), data.slug.trim().toLowerCase()].join('|'));
	}

	static createSlug(s) {
		return utils.slug(s.trim().toLowerCase());
	}
};
