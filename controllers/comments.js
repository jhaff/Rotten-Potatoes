// comments.js

var Comment = require("../models/comment.js");
const Review = require('../models/review.js');


module.exports = function(app) {
    // CREATE Comment
    app.post('/reviews/comments', (req, res) => {
        console.log("test");

      console.log(comment);
      Comment.create(req.body).then(comment => {
        res.redirect(`/reviews/'${comment.reviewId}`)
      }).catch((err) => {
        console.log(err.message)
      })
    })
}
