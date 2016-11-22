'use strict';

const Model = require('./model');
const utils = require('./utils');
const _ = utils._;
const Promise = utils.Promise;
const Answer = require('./answer');

module.exports = class Question extends Model {
	constructor(db) {
		super(db, 'Question');
	}

	onCreating(data) {
		data = Question.normalizeCreate(data);
		data._id = Question.createId(data);

		return Promise.resolve(data);
	}

	onUpdating(data) {
		data = Question.normalizeUpdate(data);

		return Promise.resolve(data);
	}

	static normalizeCreate(data) {
		data = _.pick(data, 'id', 'title', 'shortTitle', 'description', 'status', 'userId', 'answerType', 'answerVote', 'lang', 'country', 'type', 'createdAt', 'imageId', 'imageService');

		data.locale = Question.createLocale(data);
		data.slug = Question.createSlug(data.shortTitle || data.title);
		data.slug_key = Question.createSlugKey(data);

		return data;
	}

	static normalizeUpdate(data) {
		data = _.pick(data, 'id', 'title', 'description', 'status', 'type', 'countViews', 'imageId', 'imageService');

		return data;
	}

	static createLocale(data) {
		return [data.lang.trim().toLowerCase(), data.country.trim().toLowerCase()].join('-');
	}

	static createId(data) {
		return utils.md5([Question.createLocale(data), data.slug.trim()].join('|'));
	}

	static createSlugKey(data) {
		return utils.md5([Question.createLocale(data), data.slug.trim().toLowerCase()].join('|'));
	}

	static createSlug(s) {
		return utils.slug(s.trim().toLowerCase());
	}
};
