'use strict';

// Declare app level module which depends on filters, and services
angular.module('ma.common', ['ngResource', 'ngCookies', 'ui.router'])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('404', {
          url: "/404",
          templateUrl: "/partial/errors/404"
        });

      $urlRouterProvider.otherwise("/404");
      $locationProvider.html5Mode(false);
    }
  ]);