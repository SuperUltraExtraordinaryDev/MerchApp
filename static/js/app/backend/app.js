'use strict';

// Declare app level module which depends on filters, and services
angular.module('MA.Admin', ['MA.Common'])
    .config(['$routeProvider', function(routeProvider) {
        routeProvider.when('/', {templateUrl: '/backend/login', controller: 'LoginCtrl'});
        routeProvider.when('/orders', {templateUrl: '/backend/orders', controller: 'OrdersCtrl'});
    }])
    .run(['$rootScope', '$location', '$window', 'AuthSvc', function(rootScope, location, $window, authSvc) {
      rootScope.$on('$locationChangeStart', function(event, next, current) {

          if (!authSvc.IsAuthenticated) {

              if (location.path() != '/') {
                  event.preventDefault();
              }

              // Check if User logged in (Server side)
              // If not will redirect to / (Login Page)
              authSvc.IsUserLoggedIn(function(res) {
                  if (!res && location.path() != '/') {
                      location.path('/');
                  }

                  if (res && location.path() == '/') {
                      location.path('/orders');
                  }

                  if (res) {
                      location.path($window.location.hash.replace('#', ''));
                  }
              });
          }

      });
    }]);
