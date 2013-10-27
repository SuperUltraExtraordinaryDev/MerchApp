'use strict';

(function() {
    var menuCtrl = function(scope, authSvc, $location) {

        scope.CurrentUserName = null;

        (function() {
            authSvc.OnLoginStatusChanged(function (username) {
                scope.CurrentUserName = username;
            });
        })();

        scope.Logout = function () {
            authSvc.Logout().success(function(){
              $location.path('/');
            });
        };
    };

    menuCtrl.$inject = ['$scope', 'AuthSvc', '$location'];
    angular.module('MA.Admin').controller('MenuCtrl', menuCtrl);

})();