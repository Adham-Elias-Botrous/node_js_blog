const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
});

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [CommentSchema],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
