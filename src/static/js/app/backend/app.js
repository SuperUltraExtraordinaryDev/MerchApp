'use strict';

// Declare app level module which depends on filters, and services
angular.module('ma.admin', ['ma.common'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('tables', {
        url: "/admin/tables",
        templateUrl: "/partial/backend/tables"
      })
      .state('dashboard', {
        url: "/admin/dashboard",
        templateUrl: "/partial/backend/dashboard"
      })
      .state('index', {
        url: "/",
        template: ""
      });

  }])
    /*.config(['$routeProvider', function(routeProvider) {
        routeProvider.when('/admin', {templateUrl: '/partial/backend/login', controller: 'LoginCtrl'});
        routeProvider.when('/admin/orders', {templateUrl: '/partial/backend/orders', controller: 'OrdersCtrl'});
        routeProvider.when('/admin/categories', {templateUrl: '/partial/backend/orders', controller: 'OrdersCtrl'});
    }])
    .run(['$rootScope', '$location', '$window', '$authSvc', function(rootScope, location, $window, authSvc) {
      rootScope.$on('$locationChangeStart', function(event, next, current) {

          // Todo: Set security!
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
          } else {
              if (location.path() == '/') {
                  location.path('/orders');
              }
          }
      });
    }]);*/
