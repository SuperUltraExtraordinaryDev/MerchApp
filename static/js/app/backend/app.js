'use strict';

// Declare app level module which depends on filters, and services
angular.module('MerchApp.Admin', ['MerchApp.Common']).
    config(['$routeProvider', function(routeProvider) {
        routeProvider.when('/', {templateUrl: '/backend/admin', controller: 'LoginCtrl'});
    }]);