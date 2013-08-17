'use strict';

(function() {
    var authSvc = function(http){
       var self = this;

       self.Login= function(login, password){
           return http({
                method: 'POST',
                url: "/api/admin/login",
                data: { login: login, password: password }
            });
       };
    };

    authSvc.$inject = ["$http"];
    angular.module('MerchApp').service('AuthSvc', authSvc);

})();