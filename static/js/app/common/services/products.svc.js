'use strict';

(function() {
    var productsSvc = function(resource){
      var apiUrl = '/api/categories/:id';

      var params = {
        id: '@id'
      };

      var customActions = {

      };

      return resource(apiUrl, params, customActions);
    };

    productsSvc.$inject = ['$resource'];
    angular.module('MerchApp.Common').factory('ProductsSvc', productsSvc);

})();