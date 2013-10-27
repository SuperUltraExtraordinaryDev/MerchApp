var mongoose = require('mongoose');

var repository = function (model) {

  var self = this;

  // model is a name of the model or mongoose model obj.
  if (typeof model === 'function') {
    self.Model = model;
  } else {
    self.Model = require('./app/models/' + model);
  }

  self.FindById = function (id, cb) {
    if (!cb) throw new Error('Callback is not defined!');
    self.FindOne({
      _id : id
    }, function(err, entity) {
      cb(err, entity);
    });
  };

  self.FindOne = function (params, cb) {
    if (!cb) throw new Error('Callback is not defined!');
    self.Model.findOne(params, function (err, entity) {
      if (!err && !entity) {
        err = true;
      }

      cb(err, entity);
    });
  };

  self.FindAll = function (params, cb, lean) {
    if (!cb) throw new Error('Callback is not defined!');
    if (!lean) {
        self.Model.find(params).exec(cb);
    } else {
        self.Model.find(params).lean().exec(cb);
    }
  };

  self.Save = function (obj, cb) {
    if (!cb) throw new Error('Callback is not defined!');
    var entity = new self.Model(obj);
    entity.save(function (err) {
      cb(err);
    });
  };

  self.Update = function (entity, cb) {
    if (!cb) throw new Error('Callback is not defined!');
    self.FindById(entity.id, function (err, oldEntity) {
      if (err) {
        cb(err);
      } else {
          oldEntity = entity;
          oldEntity.save(cb);
      }
    })
  };

  self.Delete = function (entity, cb) {
    entity.remove(function (err) {
      cb(err);
    });
  };

};

repository.GetModel = function (modelName) {
  return mongoose.model(modelName);
};

module.exports.Repository = repository;