'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('util');

const TABLE_PREFIX = process.env.NONAME_TABLE_PREFIX || 'noname_';

/**
 * Base schema
 */
function BaseSchema() {
	Schema.apply(this, arguments);

	if (!this.paths.createdAt) {
		this.add({
			createdAt: {
				type: Date,
				default: Date.now
			}
		});
	}
	if (!this.paths.updatedAt) {
		this.add({
			updatedAt: {
				type: Date
			}
		});
	}

	this.pre('save', function(next) {
		this.updatedAt = Date.now();
		next();
	});
}

util.inherits(BaseSchema, Schema);

/**
 * Question schema
 */
const Question = exports.Question = new BaseSchema({
	// shortId
	_id: {
		type: String
	},
	title: {
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
		minlength: 10,
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
	category: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	},
	status: {
		type: String,
		enum: ['new', 'active'],
		default: 'new'
	},
	userId: {
		type: String,
		required: true
	},
	countViews: {
		type: Number,
		default: 0
	},
	voteType: {
		type: String,
		enum: ['one', 'multi'],
		default: 'multi'
	}
	// props: Schema.Types.Mixed

}, {
	collection: [TABLE_PREFIX, 'questions'].join('')
});

/**
 * Answer schema
 */
const Answer = exports.Answer = new BaseSchema({
	// shortId
	_id: {
		type: String
	},
	title: {
		type: String,
		trim: true,
		minlength: 10,
		maxlength: 100
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
		minlength: 5,
		maxlength: 100
	},
	status: {
		type: String,
		enum: ['new', 'active'],
		default: 'new'
	},
	userId: {
		type: String,
		required: true
	},
	questionId: {
		type: String,
		required: true
	},
	countVotes: {
		type: Number,
		default: 0,
		min: 0
	}
	// props: Schema.Types.Mixed

}, {
	collection: [TABLE_PREFIX, 'answers'].join('')
});

/**
 * Vote schema
 */
const Vote = exports.Vote = new BaseSchema({
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
		required: true,
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
