const mongoose = require('mongoose');
const Review = require('../models/review.js');
const express = require('express');
const app = express();
const Comment = require('../models/comment.js')

mongoose.connect('mongodb://localhost:27017/rotten-potatoes', {
    useMongoClient: true
});


    // //root route
    // app.get('/', (req, res) => {
    //     console.log("did the redirect work????!!??!?!?!?!?!?!?")
    //     Review.find()
    //         .then(reviews => {
    //             res.render('reviews-index', {
    //                 reviews: reviews
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // });
    //
    // // INDEX
    // app.get('/', (req, res) => {
    //     //start of the promise
    //     Review.find()
    //         .then(reviews => {
    //             res.render('reviews-index', {
    //                 reviews: reviews
    //             });
    //         })
    //         // if not found
    //         .catch(err => {
    //             console.log(err);
    //         })
    // })

    //NEW
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        res.render('reviews-new', { movieId: req.params.movieId });
    })

    // CREATE
    app.post('/movies/:movieId/reviews', (req, res) => {
        console.log(req.body);
        Review.create(req.body)
            .then(review => {
                console.log(review)
                res.redirect(`/movies/${req.params.movieId}/reviews/${review._id}`);
            }).catch(error => {
                console.log(error.message);
            });
    });

    // SHOW
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        // find review
        Review.findById(req.params.id).then(review => {
            // fetch its comments
            Comment.find({
                reviewId: req.params.id
            }).then(comments => {
                // respond with the template with both values
                res.render('reviews-show', {
                    review: review,
                    comments: comments
                })
            })
        }).catch((err) => {
            // catch errors
            console.log(err.message)
        });
    });

    // EDIT
    app.get('/movies/:movieId/reviews/:id/edit', function(req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {
                review: review
            });
        })
    })

    // UPDATE
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/movies/${req.params.movieId}`);
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/movies/:movieId/reviews/:id', function(req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect(`/movies/${req.params.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

module.exports = app;
