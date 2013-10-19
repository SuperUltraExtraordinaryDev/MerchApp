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
    util = require('util'),
    email = require('emailjs'),
    config = require('./config');

//
// Requiring `winston-mongodb` will expose
// `winston.transports.MongoDB`
//
require('winston-mongodb').MongoDB;

/**
 * A default list of properties in the request object that are allowed to be logged.
 * These properties will be safely included in the meta of the log.
 * 'body' is not included in this list because it can contains passwords and stuff that are sensitive for logging.
 * TODO: Include 'body' and get the defaultRequestFilter to filter the inner properties like 'password' or 'password_confirmation', etc. Pull requests anyone?
 * @type {Array}
 */
var requestWhitelist = ['url', 'headers', 'method', 'httpVersion', 'originalUrl', 'query'];

/**
 * A default list of properties in the request body that are allowed to be logged.
 * This will normally be empty here, since it should be done at the route level.
 * @type {Array}
 */
var bodyWhitelist = [];

/**
 * A default list of properties in the response object that are allowed to be logged.
 * These properties will be safely included in the meta of the log.
 * @type {Array}
 */
var responseWhitelist = ['statusCode'];

/**
 * A default function to filter the properties of the req object.
 * @param req
 * @param propName
 * @return {*}
 */
function defaultRequestFilter(req, propName) {
    return req[propName];
};

/**
 * A default function to filter the properties of the res object.
 * @param res
 * @param propName
 * @return {*}
 */
function defaultResponseFilter(req, propName) {
    return req[propName];
};

function filterObject(originalObj, whiteList, initialFilter) {

    var obj = {};

    [].concat(whiteList).forEach(function (propName) {
        var value = initialFilter(originalObj, propName);

        if(typeof (value) !== 'undefined') {
            obj[propName] = value;
        };
    });

    return obj;
}

var _container = new winston.Container();

var _elogger, _alogger;

function initErrorLogger() {
  if(typeof _elogger === 'undefined') {
    console.log('Logger created.');

      _elogger = {
        transports: [
            new (winston.transports.Console)({
                handleExceptions: true,
                colorize: true,
                timestamp: true
            }),
            new (winston.transports.File)({
                filename: 'error.log',
                colorize: true,
                timestamp: true,
                level: 'error',
                maxsize: 1048576 // 1Mb
            }),
            new (winston.transports.MongoDB)({
                db: 'merchdb',
                collection: 'errorlogs',
                host: 'localhost',
                port: '27017',
                level: 'error'
            })]
    };

      _container.add('errorLogger',_elogger);
      _elogger = _container.get('errorLogger');
  }
};

function initAccessLogger() {
    if(typeof _alogger === 'undefined') {
        console.log('Access logger created.');

        _alogger = {
            transports: [
                new (winston.transports.Console)({
                    handleExceptions: true,
                    colorize: true,
                    timestamp: true
                }),
                new (winston.transports.File)({
                    filename: 'access.log',
                    colorize: true,
                    timestamp: true,
                    level: 'info',
                    maxsize: 1048576 // 1Mb
                }),
                new (winston.transports.MongoDB)({
                    db: 'merchdb',
                    collection: 'accesslogs',
                    host: 'localhost',
                    port: '27017',
                    level: 'info'
                })]
        };

        _container.add('accessLogger',_alogger);
        _alogger = _container.get('accessLogger');
    }
};

var _errorLogger = function() {
    return function (err, req, res, next) {

        // Let winston gather all the error data.
        var exceptionMeta = winston.exception.getAllInfo(err);
        exceptionMeta.req = filterObject(req, requestWhitelist, defaultResponseFilter);

        // This is fire and forget, we don't want logging to hold up the request so don't wait for the callback
        for(var i in _elogger.transports) {
            var transport = _elogger.transports[i];
            transport.logException('Unhandled Error:' + err.message, exceptionMeta, function () {
                // Nothing to do here
            });
        }

        next(err);
    };
};

var _accessLogger = function() {
    return function (req, res, next) {

        req._startTime = (new Date);

        req._routeWhitelists = {
            req: [],
            res: [],
            body: []
        };

        // Manage to get information from the response too, just like Connect.logger does:
        var end = res.end;
        res.end = function(chunk, encoding) {
            var responseTime = (new Date) - req._startTime;

            res.end = end;
            res.end(chunk, encoding);

            var meta = {};

            var bodyWhitelist;

            requestWhitelist = requestWhitelist.concat(req._routeWhitelists.req || []);
            responseWhitelist = responseWhitelist.concat(req._routeWhitelists.res || []);

            meta.req = filterObject(req, requestWhitelist, defaultRequestFilter);
            meta.res = filterObject(res, responseWhitelist, defaultResponseFilter);

            bodyWhitelist = req._routeWhitelists.body || [];

            if (bodyWhitelist) {
                meta.req.body = filterObject(req.body, bodyWhitelist, defaultRequestFilter);
            };

            meta.responseTime = responseTime;

            var msg = util.format("HTTP %s %s", req.method, req.url);

            // This is fire and forget, we don't want logging to hold up the request so don't wait for the callback

            for(var i in _alogger.transports) {
                var transport = _alogger.transports[i];
                transport.log('info', msg, meta, function () {
                    // Nothing to do here
                });
            }
        };

        next();
    };
};

initAccessLogger();
_alogger.cli();
initErrorLogger();
_elogger.cli();


module.exports = {
    logger: _elogger,
    errorLogger: _errorLogger,
    accessLogger: _accessLogger
};

