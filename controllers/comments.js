// comments.js
const express = require('express');
const app = express();
const Comment = require("../models/comment.js");
const Review = require('../models/review.js');

// CREATE Comment
app.post('/reviews/comments', (req, res) => {
  Comment.create(req.body).then(comment => {
      console.log(comment);
    res.redirect(`/reviews/${comment.reviewId}`);  //redirects to review page
  }).catch((err) => {
    console.log(err.message)
  })
});

// REMOVE comment
app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`); //redirects to review page
  }).catch((err) => {
    console.log(err.message);
  })
});

module.exports = app;
