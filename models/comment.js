const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useMongoClient: true });
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = Comment;
