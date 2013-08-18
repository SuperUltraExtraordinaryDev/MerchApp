'use strict';

// Declare app level module which depends on filters, and services
angular.module('MerchApp.Admin', ['MerchApp.Common'])
    .config(['$routeProvider', function(routeProvider) {
        routeProvider.when('/', {templateUrl: '/backend/login', controller: 'LoginCtrl'});
        routeProvider.when('/orders', {templateUrl: '/backend/orders', controller: 'OrdersCtrl'});
    }])
    .run(['$rootScope', '$location', 'AuthSvc', function(rootScope, location, authSvc) {
      rootScope.$on('$routeChangeSuccess', function(scope, currRoute, prevRoute) {
        if (!currRoute.securityDisabled) {

          // If user already authenticated
          // navigate to default page
          if (location.path() == '/' && authSvc.IsAuthenticated) {
            location.path('/orders');
            return;
          }

          // Check if User logged in (Server side)
          // If not will redirect to / (Login Page)
          authSvc.IsUserLoggedIn(function(res) {
              if (!res) {
                location.path('/');
              } else if (location.path() == '/') {
                  location.path('/orders');
              }
          });
        }
      });
    }]);
