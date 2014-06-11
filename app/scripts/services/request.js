'use strict';

var URL = 'http://music-hasalon-api.herokuapp.com';

angular.module('musicPcApp')
  .factory('Request', function($http, Auth) {
      return {
        delete: function(id) {
          return $http.delete(URL + '/requests/' + id, {
            params: {
              user_access_token: Auth.getUser().access_token
            }
          });
        }
      }
  });
