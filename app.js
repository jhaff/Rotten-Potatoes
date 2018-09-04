const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// The following line must appear AFTER const app = express() and before routes!
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//  initialize mongoose in app.js and connect to our database that we'll name after our app.
mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useMongoClient: true });

// adding a model to our review
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
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
  console.log(req.body);
  res.render('reviews-new', {});
})


// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Incredible Review" },
//   { title: "Next Review" }
// ]

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
