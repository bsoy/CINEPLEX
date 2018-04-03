
var express = require('express');
var app=express();

/* template engine */
app.set('views', './app/views/pages');
app.set('view engine', 'jade');

var dbUrl = 'mongodb://localhost/cineplex'
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
app.use(session({
    secret: 'flounder',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))
/* database */
var mongoose =  require('mongoose')
mongoose.connect(dbUrl)

app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); //formatting data in forms
app.locals.moment = require('moment');

var logger = require('morgan');
if('development' === app.get('env')){
    app.set('showStackError', true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}

require('./config/routes')(app)

var port=process.env.port || 3000;
app.listen(port);
console.log('cineplex started on port ' + port);