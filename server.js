#!/usr/bin/env node
var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    logger = require('./logger');

// load configuration
var config = require('./config');

// set application mode
global.process.env.NODE_ENV = config.NODE_ENV;

// express application
var app = express();

// mongoose setup
if ('development' === app.get('env')) {
    mongoose.connect(config.dev.MONGO_URI);
} else {
    mongoose.connect(config.MONGO_URI);
}

// environments
app.set('port', config.PORT);
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use('/static', require('stylus').middleware(path.join(__dirname + '/static')));
app.use('/static', express['static'](path.join(__dirname, '/static')));
// logger defined after static files to skip it.
app.use(express.logger({ immediate: false, format: config.LOGGER_FORMAT }));
app.use(logger.accessLog);

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.SECRET));

// development mode only
if ('development' === app.get('env')) {
  app.use(express.session());
} else {
  var RedisStore = require('connect-redis')(express);
  app.use(express.session({
      secret: config.SECRET,
      store: new RedisStore({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT, 
        db: config.REDIS_DB
      })
  }));  
}

app.use(app.router);

app.use(logger.errorLog);

// initialize routes
require('./routes')(app);

// run application
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
