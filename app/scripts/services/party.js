'use strict';

var URL = 'http://music-hasalon-api.herokuapp.com';

angular.module('musicPcApp')
  .factory('Party', function($http, Auth) {
    return {
      getUserParties: function() {
        var user = Auth.getUser();
        return $http.get(URL + '/users/' + user.id);
      },
      getParty: function(partyId) {
        return $http.get(URL + '/parties/' + partyId);
      }
    }
  });
