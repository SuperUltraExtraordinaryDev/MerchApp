'use strict';

(function() {
    var authSvc = function($http, $cookies){
       var self = this;

       self.Login= function(login, password){
           return $http({
                method: 'POST',
                url: "/api/admin/login",
                data: { login: login, password: password }
            });
       };

        self.Logout= function(){
            return $http({
                method: 'GET',
                url: "/api/admin/logout"
            });
        };
    };

    authSvc.$inject = ['$http', '$cookies'];
    angular.module('MerchApp').service('AuthSvc', authSvc);

})();