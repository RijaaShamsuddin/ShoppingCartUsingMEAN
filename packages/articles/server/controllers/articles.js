'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    Order = mongoose.model('Order'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function (req, res, next, id) {
    Article.load(id, function (err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function (req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(article);

    });
};

/**
 * Update an article
 */
exports.update = function (req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot update the article'
            });
        }
        res.json(article);

    });
};

/**
 * Delete an article
 */
exports.destroy = function (req, res) {
    var article = req.article;

    article.remove(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot delete the article'
            });
        }
        res.json(article);

    });
};

/**
 * Show an article
 */
exports.show = function (req, res) {
    res.json(req.article);
};

/**
 * List of Articles
 */
exports.all = function (req, res) {
    Article.find().populate('user', 'name username').exec(function (err, articles) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the articles'
            });
        }
        res.json(articles);

    });
};

/**
 * create order
 */
exports.createOrder = function (req, res) {
    var order = new Order(req.body);
    order.user = req.user;

    order.save(function (err) {
        if (err) {
            return res.status(500).json({
               error: 'Cannot create an Order'
            });
        }
        res.json(order);
    });
};

/**
 * Find order by id
 */
exports.order = function (req, res, next, id) {
    Order.load(id, function (err, order) {
        if (err) return next(err);
        if (!order) return next(new Error('Failed to load order ' + id));
        req.order = order;
        next();
    });
};

exports.showOrder = function (req, res) {
    res.json(req.order);
};

/**
 * Delete an order
 */
exports.destroyOrder = function (req, res) {
    var order = req.order;

    order.remove(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot delete the article'
            });
        }
        res.json(order);

    });
};

/**
 * List of Orders
 */
exports.showAllOrder = function (req, res) {
    Order.find().populate('user', 'name username').exec(function (err, orders) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the orders'
            });
        }
        res.json(orders);

    });
};