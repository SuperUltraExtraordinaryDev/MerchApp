'use strict';

(function() {
    var menuCtrl = function(scope, authSvc) {

        scope.CurrentUserName = null;

        var setCurrentUserName = function(name) {
          scope.CurrentUserName = name;
        };

        (function() {
            authSvc.LoginStatusChanged(function (username) {
                setCurrentUserName(username);
            });
        })();

        scope.SignOut = function() {
          authSvc.Logout();
        };
    };

    menuCtrl.$inject = ['$scope', 'AuthSvc'];
    angular.module('MerchApp.Admin').controller('MenuCtrl', menuCtrl);

})();