'use strict';

const Model = require('./model');
const utils = require('./utils');
const _ = utils._;
const Promise = utils.Promise;

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
		data = _.pick(data, 'id', 'title', 'description', 'status', 'userId', 'voteType', 'lang', 'country', 'category');

		data.locale = Question.createLocale(data);
		data.slug = Question.createSlug(data.title);
		data.slug_key = Question.createSlugKey(data);

		return data;
	}

	static normalizeUpdate(data) {
		data = _.pick(data, 'id', 'title', 'slug', 'description', 'status', 'voteType', 'category', 'lang', 'country', 'countViews');

		if (data.slug) {
			data.slug = Question.createSlug(typeof data.slug === 'string' ? data.slug : data.title);
			data.slug_key = Question.createSlugKey(data);
		}

		return data;
	}

	static createLocale(data) {
		return [data.lang.trim().toLowerCase(), data.country.trim().toLowerCase()].join('_');
	}

	static createId() {
		return utils.shortid();
	}

	static createSlugKey(data) {
		return utils.md5([data.lang.trim().toLowerCase(), data.country.trim().toLowerCase(), data.slug.trim().toLowerCase()].join('|'));
	}

	static createSlug(s) {
		return utils.slug(s.trim().toLowerCase());
	}
};
