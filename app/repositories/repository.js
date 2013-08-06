var mongoose = require('mongoose');

var repository = function (modelName) {

  var self = this;

  self.Model = require('../models/' + modelName);

  self.FindById = function (id, cb) {
    self.FindOne({
      _id : id
    }, function(err, entity) {
      cb(err, entity);
    });
  };

  self.FindOne = function (params, cb) {
    self.Model.findOne(params, function (err, entity) {
      if (!err && !entity) {
        err = true;
      }

      cb(err, entity);
    });
  };

  self.FindAll = function (params, cb, lean) {
    if (!lean) {
        self.Model.find(params).exec(cb);
    } else {
        self.Model.find(params).lean().exec(cb);
    }
  };

  self.Save = function (obj, cb) {
    var entity = new self.Model(obj);
    entity.save(function (err) {
      cb(err);
    });
  };

  self.Update = function (entity, cb) {
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