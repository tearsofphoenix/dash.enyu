
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var utils = require('../../lib/utils');
var extend = require('util')._extend;

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Article.load(id, function (err, article) {
    if (err) return next(err);
    if (!article) return next(new Error('not found'));
    req.article = article;
    next();
  });
};

/**
 * List
 */

exports.index = function (req, res){

    res.render('fellowship/index', {
        fellowship: {name : "莱顿团契"}
    });
};

exports.addmember = function(req, res) {

};

/**
 * Edit an article
 */

exports.edit = function (req, res) {
  res.render('fellowship/edit', {
    title: 'Edit ' + req.article.title,
    article: req.article
  });
};

/**
 * Update article
 */

exports.update = function (req, res){
  var article = req.article;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  article = extend(article, req.body);

  article.uploadAndSave(images, function (err) {
    if (!err) {
      return res.redirect('/fellowship/' + article._id);
    }

    res.render('fellowship/edit', {
      title: 'Edit Article',
      article: article,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = function (req, res){
  res.render('fellowship/show', {
    title: req.article.title,
    article: req.article
  });
};

/**
 * Delete an article
 */

exports.destroy = function (req, res){
  var article = req.article;
  article.remove(function (err){
    req.flash('info', 'Deleted successfully');
    res.redirect('/fellowship');
  });
};
