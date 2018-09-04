const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//  initialize mongoose in app.js and connect to our database that we'll name after our app.
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

// adding a model to our review
const Review = mongoose.model('Review', {
  title: String
});

// INDEX
app.get('/', (req, res) => {
    //start of the promise
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

//fulfilling the promise - code that execudes when the review is found in the database
// Reviews.find().then((review) => {
//
//     Reviews.find().then((review) => { ... }).catch((err) => { ...executed if the promise is rejected... })
//
// })

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Incredible Review" },
//   { title: "Next Review" }
// ]

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
