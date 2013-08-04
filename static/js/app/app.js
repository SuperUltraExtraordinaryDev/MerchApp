'use strict';

// Declare app level module which depends on filters, and services
angular.module('MerchApp', []).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {templateUrl: '/products/categories', controller: 'CategoriesCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(false);
    }]);