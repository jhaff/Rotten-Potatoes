const express = require('express');
const app = express();
const Review = require('../models/review.js');


  app.get('/admin', (req, res) => {
    Review.find()
      .then(reviews => {
          res.render('admin', { reviews: reviews });
      })
      .catch(error => {
        console.log(error);
      });
  });

  app.delete('/admin/reviews/:id', function(req, res) {
         Review.findByIdAndRemove(req.params.id).then((review) => {
             res.status(200).send({
                 review: review
             });
         }).catch((err) => {
             res.status(400).send({
                 err: err
             })
         })
     });

module.exports = app;
