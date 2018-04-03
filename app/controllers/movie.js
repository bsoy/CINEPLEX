var Movie = require('../models/movie')
var _ = require('underscore')

// detail page
exports.detail = function(req, res){
    var id = req.params.id;
    Movie.findById(id, function(err, movie){
        res.render('detail', {
            title: 'Movie ' + movie.title,
            movie: movie
        })
    })
}

// admin get page
exports.new = function(req, res){
    res.render('admin', {
        title: 'Cineplex Admin',
        movie: {
            title: '',
            director: '',           
            poster: '',
            flash: '',
            year: '',
            intro: ''
        }
    })
}

// admin post page
exports.save = function(req, res){
    var id = req.body.movie._id;
    var newMovie = req.body.movie;
    var _movie;

    if(id !== 'undefined'){
        Movie.findById(id, function(err, movie){
            if(err){
                console.log(err)
            }
            _movie = _.extend(movie, newMovie)
            _movie.save(function(err, movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    }else{
        _movie = new Movie({
            title: newMovie.title,
            director: newMovie.director,
            year: newMovie.year,
            info: newMovie.info,
            poster: newMovie.poster,
            flash: newMovie.flash
        })        
        _movie.save(function(err, movie){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
}

// admin update movie
exports.update = function(req, res){
    var id = req.params.id
    if(id){
        Movie.findById(id, function(err, movie){
            res.render('admin', {
                title: 'Update movie',
                movie: movie
            })
        })
    }
}

// list
exports.list =  function(req, res){
    Movie.fetch(function(err, movies){
        if(err){
            console.log(err)
        }
        res.render('list', {
            title: 'Cineplex Admin List',
            movies: movies
        })
    })
}
// list delete movie
exports.del =  function(req, res){
    var id = req.query.id
    if(id){
        Movie.remove({_id: id}, function(err, movie){
            if(err){
                console.log(err)
            }else{
                res.json({success: 1})
            }
        })
    }
}