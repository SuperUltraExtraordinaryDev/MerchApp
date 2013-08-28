'use strict';

(function() {
    var categoryItem = function(templateCache){
      return {
        restrict: 'E',

        replace: true,
        transclude: false,
        scope: { items:'=in'},

        // Use templateCache instead of templateUrl
        template: templateCache.get('category-item'),

        // The linking function will add behavior to the template
        link: function(scope, element, attrs) {


        }
      }
    };

    categoryItem.$inject = ['$templateCache'];
    angular.module('MA').directive('categoryItem', categoryItem);

})();