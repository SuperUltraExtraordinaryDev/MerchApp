'use strict';

(function() {
    var loginCtrl = function(scope, authSvc) {

      scope.Model = {
          Login: '',
          Password: ''
      };

      scope.SignIn = function(){
          if (!scope.Model.Login || !scope.Model.Password) {
              alert('Please fill form');
          } else {
              authSvc.Login(scope.Model.Login, scope.Model.Password).then(function(res) {
                 if (res.data.success) {
                     debugger
                     authSvc.Logout();
                 }
              });
          }


      };
    };

    loginCtrl.$inject = ['$scope', 'AuthSvc'];
    angular.module('MerchApp.Common').controller('LoginCtrl', loginCtrl);

})();