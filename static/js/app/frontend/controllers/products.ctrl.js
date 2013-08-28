'use strict';

(function() {
    var productsCtrl = function(scope, productsSvc, routeParams){

      scope.Category = productsSvc.get({ id: routeParams.id });


    };

    productsCtrl.$inject = ['$scope', 'ProductsSvc', "$routeParams"];
    angular.module('MA').controller('ProductsCtrl', productsCtrl);

})();