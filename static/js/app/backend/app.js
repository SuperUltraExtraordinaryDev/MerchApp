'use strict';

// Declare app level module which depends on filters, and services
angular.module('MerchApp.Admin', ['MerchApp.Common'])
    .config(['$routeProvider', function(routeProvider) {
        routeProvider.when('/', {templateUrl: '/backend/login', controller: 'LoginCtrl', securityDisabled: true });
        routeProvider.when('/orders', {templateUrl: '/backend/orders', controller: 'OrdersCtrl'});
    }])
    .run(['$rootScope', '$location', 'AuthSvc', function(rootScope, location, authSvc) {
      rootScope.$on('$routeChangeSuccess', function(scope, currRoute, prevRoute) {
        if (!currRoute.securityDisabled) {
          // Check if User logged in (Server side)
          // If not will redirect to / (Login Page)
          authSvc.IsUserLoggedIn(function(res) {
              if (!res) {
                location.path('/');
              } else if (location.path() == '/') {
                  location.path('/orders');
              }
          });
        } else {
            if (location.path() == '/' && authSvc.IsAuthenticated) {
                location.path('/orders');
            }
        }
      });
    }]);
