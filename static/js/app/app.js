'use strict';

// Declare app level module which depends on filters, and services
angular.module('MerchApp', ['ngResource', 'ngCookies']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {templateUrl: '/products/categories', controller: 'CategoriesCtrl'});
        $routeProvider.when('/category/:id', {templateUrl: '/products/products', controller: 'ProductsCtrl'});
        $routeProvider.when('/errors/404', {templateUrl: '/errors/404'});
        $routeProvider.when('/admin', {templateUrl: '/admin/login', controller: 'LoginCtrl'});
        $routeProvider.otherwise({redirectTo: '/errors/404'});
        $locationProvider.html5Mode(false);
    }]);