//import mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useMongoClient: true });


// adding a model to our review
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  movieRating: String,
});
module.exports = Review;
