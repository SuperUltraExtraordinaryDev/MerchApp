'use strict';

// Declare app level module which depends on filters, and services
angular.module('MerchApp', ['MerchApp.Common']).
    config(['$routeProvider', function(routeProvider) {
        routeProvider.when('/', {templateUrl: '/frontend/categories', controller: 'CategoriesCtrl'});
        routeProvider.when('/category/:id', {templateUrl: '/frontend/products', controller: 'ProductsCtrl'});
    }]);