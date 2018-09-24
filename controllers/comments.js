// comments.js
const express = require('express');
const app = express();
const Comment = require("../models/comment.js");
const Review = require('../models/review.js');

// CREATE Comment
app.post('/movies/:movieId/reviews/comments', (req, res) => {
  Comment.create(req.body).then(comment => {
    res.status(200).send({ comment: comment });
  }).catch((err) => {
    res.status(400).send({ err: err })
  })
})

// REMOVE comment
app.delete('/movies/:movieId/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`); //redirects to review page
  }).catch((err) => {
    console.log(err.message);
  })
});

module.exports = app;
