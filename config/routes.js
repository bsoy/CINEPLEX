
var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')


module.exports = function(app){
        // pre handle user
    app.use(function(req, res, next){
        app.locals.user = req.session.user
        next()
    })

    // index
    app.get('/', Index.index);

    // user
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/logout', User.logout)
    app.get('/admin/userlist', User.list)

    // movie
    app.get('/movie/:id', Movie.detail)
    app.get('/admin/movie', Movie.new);
    app.post('/admin/movie', Movie.save)
    app.get('/admin/movie/update/:id', Movie.update)
    app.get('/admin/movie/list', Movie.list);
    app.delete('/admin/movie/list', Movie.del)
}