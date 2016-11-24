'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TABLE_PREFIX = process.env.NONAME_TABLE_PREFIX || 'noname_';

const ANSWER_TYPE = ['positive', 'negative', 'entity'];

/**
 * Question schema
 */
const Question = exports.Question = new Schema({
	// hash(locale|slug)
	_id: {
		type: String
	},
	title: {
		type: String,
		trim: true,
		required: true,
		minlength: 10,
		maxlength: 100
	},
	shortTitle: {
		type: String,
		trim: true,
		minlength: 10,
		maxlength: 100
	},
	// hash(lang|country|slug)
	slug_key: {
		type: String,
		required: true,
		unique: true
	},
	slug: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		minlength: 5,
		maxlength: 100
	},
	description: {
		type: String,
		trim: true,
		minlength: 50,
		maxlength: 500
	},
	lang: {
		type: String,
		trim: true,
		lowercase: true,
		minlength: 2,
		maxlength: 2
	},
	country: {
		type: String,
		trim: true,
		lowercase: true,
		minlength: 2,
		maxlength: 2
	},
	// LANG_COUNTRY
	locale: {
		type: String,
		required: true,
		index: true,
		minlength: 5,
		maxlength: 5
	},
	type: {
		type: String,
		enum: ['tops', 'features'],
		index: true
	},
	status: {
		type: String,
		enum: ['new', 'active'],
		default: 'new',
		index: true
	},
	userId: {
		type: String,
		required: true
	},
	countViews: {
		type: Number,
		default: 0
	},
	answerVote: {
		type: String,
		enum: ['one', 'multi'],
		default: 'multi'
	},
	answerType: {
		type: String,
		enum: ANSWER_TYPE
	},
	maxAnswers: {
		type: Number,
		min: 2,
		max: 10,
		default: 2
	},
	imageId: {
		type: String,
		maxlength: 100
	},
	imageService: {
		type: String,
		maxlength: 100
	},
	createdAt: {
		type: Number,
		default: Date.now,
		index: true
	},
	updatedAt: {
		type: Number,
		default: Date.now
	}

}, {
	collection: [TABLE_PREFIX, 'questions'].join('')
});

/**
 * Answer schema
 */
const Answer = exports.Answer = new Schema({
	// shortId
	_id: {
		type: String
	},
	title: {
		type: String,
		trim: true,
		minlength: 2,
		maxlength: 100
	},
	description: {
		type: String,
		trim: true,
		minlength: 10,
		maxlength: 500
	},
	// hash(questionId|slug)
	slug_key: {
		type: String,
		required: true,
		unique: true
	},
	slug: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		minlength: 2,
		maxlength: 100
	},
	// status: {
	// 	type: String,
	// 	enum: ['new', 'active'],
	// 	default: 'new'
	// },
	userId: {
		type: String,
		required: true
	},
	questionId: {
		type: String,
		required: true,
		index: true
	},
	countVotes: {
		type: Number,
		default: 0,
		min: 0,
		index: true
	},
	type: {
		type: String,
		enum: ANSWER_TYPE
	},
	createdAt: {
		type: Number,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		default: Date.now
	}
	// props: Schema.Types.Mixed

}, {
	collection: [TABLE_PREFIX, 'answers'].join('')
});

/**
 * Vote schema
 */
const Vote = exports.Vote = new Schema({
	// hash(answerId|userId)
	_id: {
		type: String
	},
	questionId: {
		type: String,
		required: true,
		maxlength: 50
	},
	answerId: {
		type: String,
		required: true,
		index: true,
		maxlength: 50
	},
	userId: {
		type: String,
		required: true,
		maxlength: 50
	},
	userLang: {
		type: String,
		minlength: 2,
		maxlength: 10
	},
	userGender: {
		type: String,
		// male, female, unknown
		enum: ['m', 'f', 'n'],
		default: 'n'
	},
	userIp: {
		type: String,
		minlength: 2,
		maxlength: 50
	},
	createdAt: {
		type: Number,
		default: Date.now
	}
}, {
	collection: [TABLE_PREFIX, 'votes'].join('')
});

Question.set('toObject', {
	getters: true
});

Answer.set('toObject', {
	getters: true
});

Vote.set('toObject', {
	getters: true
});
