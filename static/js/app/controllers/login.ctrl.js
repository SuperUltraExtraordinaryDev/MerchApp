'use strict';

(function() {
    var categoriesCtrl = function(scope, authSvc){

      scope.Model = {
          Login: '',
          Password: ''
      };

      scope.SignIn = function(){
          if (!scope.Model.Login || !scope.Model.Password) {
              alert('Please fill form');
          } else {
              authSvc.Login(scope.Model.Login, scope.Model.Password).then(function(res) {
                 if (res.data.toJSON().success) {
                     debugger
                 }
              });
          }


      };
    };

    categoriesCtrl.$inject = ['$scope', 'AuthSvc'];
    angular.module('MerchApp').controller('LoginCtrl', categoriesCtrl);

})();