'use strict';

var URL = 'http://music-hasalon-api.herokuapp.com';

angular.module('musicPcApp')
 .factory('Auth', function($http, $rootScope, $cookieStore){
    var currentUser = null;
    return {
      login: function(params) {
        var self = this;
        return $http({
          url: URL + '/sessions',
          method: 'POST',
          data: {
            access_token: params.access_token,
            expires_in: params.expires_in
          }
        }).success(function(data) {
          // console.log(data);
          self.setUser(data);
          $cookieStore.put('user', currentUser);
        });
      },
      logout: function() {
        $cookieStore.put('user', null);
        this.setUser(null);
      },
      setUser: function(user) {
        currentUser = user;
        $rootScope.$broadcast('user.set');
      },
      getUser: function(user) {
        return currentUser;
      },
      loggedIn: function() {
        if (currentUser != null) {
          return true;
        } else {
          return false
        }
      }
    }
  });