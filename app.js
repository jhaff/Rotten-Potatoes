const express = require('express')
const methodOverride = require('method-override')

const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// The following line must appear AFTER const app = express() and before routes!
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//  initialize mongoose in app.js and connect to our database that we'll name after our app.
mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useMongoClient: true });

// adding a model to our review
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  movieRating: String,
});

// INDEX
app.get('/', (req, res) => {
    //start of the promise
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    // if not found
    .catch(err => {
      console.log(err);
    })
})

//NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

// EDIT
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

//OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Incredible Review" },
//   { title: "Next Review" }
// ]

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
