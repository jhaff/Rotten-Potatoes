const express = require('express')
const methodOverride = require('method-override')
const Comment = require('./models/comment')
const commentsController = require('./controllers/comments.js')
const reviewsController = require('./controllers/reviews.js')
const moviesController = require('./controllers/movies.js')
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); // INITIALIZE BODY-PARSER AND ADD IT TO APP

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// The following line must appear AFTER const app = express() and before routes!
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));
app.use('/public', express.static('./public'))
app.use(commentsController);
app.use(reviewsController);
app.use(moviesController);



//  initialize mongoose in app.js and connect to our database that we'll name after our app.
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes';
mongoose.connect(mongoUri, { useNewUrlParser: true });

// reviews(app);

module.exports = app.listen(port, () => {
  console.log('App listening on port 3000!')
})
