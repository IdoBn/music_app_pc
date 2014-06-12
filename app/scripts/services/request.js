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
        },
        create: function(song, partyId) {
          return $http({
            url: URL + '/requests',
            method: 'POST',
            data: {
              request: {
                title: song.title,
                author: song.author.name,
                url: song.player_url,
                party_id: partyId,
                thumbnail: song.thumbnails[0].url
              },
              user_access_token: Auth.getUser().access_token
            }
          });
        }
      }
  });
