const express = require('express')
const methodOverride = require('method-override')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

const app = express()
var exphbs = require('express-handlebars');
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

const reviews = require('./controllers/reviews.js')
reviews(app);

//OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Incredible Review" },
//   { title: "Next Review" }
// ]

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
