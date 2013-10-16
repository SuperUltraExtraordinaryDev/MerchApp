/*var config = require('./config'),
    repo = require('./repository'),
    mongoose = require('mongoose'),
    moment = require('moment');

var Schema = mongoose.Schema;

var logEntrySchema = new Schema({
  date: Date,
  dateStr: String,
  method: String,
  contentType: String,
  contentSize: Number,
  protocol: String,
  url: String,
  status: Number,
  timeLatency: Number
});

var logRepo = new repo.Repository(mongoose.model('Log', logEntrySchema));

var extractLogEntry = function(req, res) {
 var logEntry = new logRepo.Model();
 with(logEntry) {
     date = moment().utc(),
     dateStr = moment().utc().format('YYYY-MM-DD HH:mm:ss Z');
     method = req.method;
     contentType = res.get('Content-Type');
     contentSize = res.get('Content-Length');
     protocol = req.protocol;
     url = req.originalUrl;
     status = res.statusCode;
     timeLatency = (new Date - req._startTime);
 }

 return logEntry;
};

module.exports.accessLog = function(req, res, next) {
    var end = res.end;
    res.end = function(chunk, encoding){
        res.end = end;
        res.end(chunk, encoding);
        logRepo.Save(extractLogEntry(req, res), function(){});
    };

    next();
}

module.exports.errorLog = function(err, req, res) {
    // log it
    console.error(err.stack);
    logRepo.Save(extractLogEntry(req, res), function(){});
    // respond with 500 "Internal Server Error".
    res.send(500);
}*/
'use strict'

var winston = require('winston'),
    email = require('emailjs'),
    config = require('./config');

//
// Requiring `winston-mongodb` will expose
// `winston.transports.MongoDB`
//
var mongodb = require('winston-mongodb').MongoDB;

var logger = new (winston.Logger)({
  exitOnError: false,
  transports: [
    new (winston.transports.Console)({
      handleExceptions: true,
      colorize: true,
      timestamp: true
    }),
    new (winston.transports.File)({
      filename: 'all-logs.log',
      handleExceptions: true,
      colorize: true,
      timestamp: true,
      maxsize: 1048576 // 1Mb
    }),
    new (mongodb)({
      db: 'merchdb',
      //collection: 'logs',
      //host: 'localhost',
      //port: '27017',
      level: 'error',
        handleExceptions: true
    })
    /*new (winston.transports.File)({
      filename: 'error.log',
      handleExceptions: true,
      timestamp: true,
      level: 'error',
      maxsize: 1048576 // 1Mb
    }), */

  ]
});

logger.cli();

module.exports = logger;

