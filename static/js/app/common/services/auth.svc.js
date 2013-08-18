'use strict';

(function() {
    var authSvc = function(http, cookies, location){
       var self = this,
           observers = [];

       var notifyObservers = function (login) {
            angular.forEach(observers, function(cb) {
                cb(login);
            });
       };

       self.LoginStatusChanged = function(callback) {
         observers.push(callback);
       };

       self.IsUserLoggedIn = function(cb) {
         http.get('/api/backend/IsUserLoggedIn').success(function(res) {

           if (cookies.user && res.success) {
             cb(res.username);
           } else {
             location.path('/');
           }
         });
       };

       self.Login= function(login, password){
           return http({
                method: 'POST',
                url: "/api/backend/login",
                data: { login: login, password: password }
            }).success(function(res) {
                 if (res.success) {
                   notifyObservers(login);
                 }
               });
       };

       self.Logout= function(){
            return http({
                method: 'GET',
                url: "/api/backend/logout"
            }).success(function() {
                    notifyObservers();
                });
        };
    };

    authSvc.$inject = ['$http', '$cookies', '$location'];
    angular.module('MerchApp.Common').service('AuthSvc', authSvc);

})();