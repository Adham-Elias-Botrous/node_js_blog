const Post = require('../models/post');
const createError = require('http-errors');

exports.create = (req, res, next) => {
  let model = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user.id
  });
  model
    .save()
    .then(post => {
      res.status(200).end();
    })
    .catch(next);
};

exports.list = (req, res, next) => {
  Post.find()
    .select('-commnets')
    .sort({ created_at: 'desc' })
    .populate('author', 'name')
    .then(posts => {
      if (!posts) throw createError(404);
      res.json(posts);
    })
    .catch(next);
};

exports.details = (req, res, next) => {
  let postId = req.params.id;
  Post.findById(postId)
    .populate('author', 'name')
    .populate('comments.author', 'name')
    .then(post => {
      if (!post) throw createError(404);
      res.json(post);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        err.name = 'noRecord';
        err.message = 'Not Found';
        err.status = 404;
      }

      next(err);
    });
};

exports.update = (req, res, next) => {
  let postId = req.params.id;
  let data = { title: req.body.title, content: req.body.content };
  Post.findByIdAndUpdate({ _id: postId, author: req.user.id }, data, {
    runValidators: true
  })
    .then(post => {
      if (!post) throw createError(404);
      res.status(200).end();
    })
    .catch(next);
};
exports.delete = (req, res, next) => {
  let postId = req.params.id;

  Post.findByIdAndDelete({ _id: postId, author: req.user.id })
    .then(post => {
      if (!post) throw createError(404);
      res.status(200).end();
    })
    .catch(next);
};
