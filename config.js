var e = module.exports;

//e.NODE_ENV = 'production';
e.NODE_ENV = 'development';
e.PORT = process.env.PORT || 5000;
e.LOGGER_FORMAT = 'dev';
e.SECRET = 'q!s#fkTy_uiDdsW$rt^#asM';

/*** Dev environment ***/
var dev = {};
dev.MONGO_URI = 'mongodb://localhost:27017/merch';
e.dev = dev;

/*** Prod environment ***/
e.MONGO_URI = 'mongodb://merchtest:merchtest@paulo.mongohq.com:10024/merchtest';
e.REDIS_HOST = 'localhost';
e.REDIS_PORT = 6379;
e.REDIS_DB = 1;

