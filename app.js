let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

/*var db = require('./models/db');
var User = require('./models/User');*/



//Moved server from bin here so I can pass the server to Socket IO
let app = express();
let server = require('http').Server(app);
//Socket IO service
let io = require('socket.io')(server);
//Setting io Object as a global is not good practice,
// but having _ in the name should do the trick for a small scale
//application, for future scaling the routes should be exported as a
// function and the function should intake io object here in the app
global._io = io;
//Since Socket IO is a server there should
// be an active connection all the time,
// that is why I can't pass it directly on a router.
//The router gets invoked once and serves HTTP request from the server
io.on('connection', function (socket) {
  console.log('user connected');
});
io.on('redirect', function (socket) {
    console.log('event');
});

let index = require('./routes/index');
let spotify = require('./routes/spotify');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/spotify', spotify);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.set('socketio', io);

module.exports = {app: app, server: server};
