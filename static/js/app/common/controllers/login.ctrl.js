'use strict';

(function() {
    var loginCtrl = function(scope, location, authSvc) {

        var navigateToDefaultPage = function() {
          location.path('/orders');
        };

        (function() {

        })();

      scope.Model = {
          Login: '',
          Password: ''
      };

      scope.SignIn = function(){
          if (!scope.Model.Login || !scope.Model.Password) {
              alert('Please fill form');
          } else {
              authSvc.Login(scope.Model.Login, scope.Model.Password)
                  .success(function(res) {
                    if (res.success) {
                      navigateToDefaultPage();
                    }
                  });
          }


      };
    };

    loginCtrl.$inject = ['$scope', '$location', 'AuthSvc'];
    angular.module('MerchApp.Common').controller('LoginCtrl', loginCtrl);

})();