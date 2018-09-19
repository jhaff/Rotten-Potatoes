const express = require('express');
const app = express();
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('1506b0c38289216debb158893384fee0')

app.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then(response => {
    res.render('movies-index', { movies: response.results });
  }).catch(console.error)
})

app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then(movie =>{
    res.render('movies-show', { movie: movie });
  }).catch(console.error)
})

module.exports = app;
