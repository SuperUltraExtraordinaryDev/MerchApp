'use strict';

(function() {
    var authSvc = function(http, cookies){
       var self = this,
           observers = [];

       var notifyObservers = function (login) {
            angular.forEach(observers, function(cb) {
                cb(login);
            });
       };

       self.IsAuthenticated = false;

       self.LoginStatusChanged = function(callback) {
         observers.push(callback);
       };

       self.IsUserLoggedIn = function(cb) {
         http.get('/api/backend/IsUserLoggedIn').success(function(res) {
           self.IsAuthenticated = cookies.user && res.success;
           if (self.IsAuthenticated) {
               cb(true);
               notifyObservers(res.username);
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
                   self.IsAuthenticated = true;
                   notifyObservers(login);
                 }
               });
       };

       self.Logout= function(){
            return http({
                method: 'GET',
                url: "/api/backend/logout"
            }).success(function() {
                    self.IsAuthenticated = false;
                    notifyObservers();
                });
        };
    };

    authSvc.$inject = ['$http', '$cookies'];
    angular.module('MerchApp.Common').service('AuthSvc', authSvc);

})();