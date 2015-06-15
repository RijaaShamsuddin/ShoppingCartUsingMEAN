'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true
    }
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(function (title) {
    return !!title;
}, 'Title cannot be blank');

ArticleSchema.path('content').validate(function (content) {
    return !!content;
}, 'Content cannot be blank');

ArticleSchema.path('price').validate(function (price) {
    return !!price;
}, 'Price cannot be blank');

/**
 * Statics
 */
ArticleSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

/**
 * Article Schema
 */
var OrderSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Array
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    total: {
        type: Number,
        required: true
    }
});

/**
* Statics
*/
OrderSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Article', ArticleSchema);
mongoose.model('Order', OrderSchema);