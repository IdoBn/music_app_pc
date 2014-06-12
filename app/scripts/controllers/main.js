'use strict';

angular.module('musicPcApp')
  .controller('MainCtrl', function ($scope, Auth, Party, Request, $modal) {
    Party.getUserParties().success(function(data) {
      $scope.parties = data.user.parties;
    });

    var partyId = null;

    $scope.partySelected = function(party) {
      $scope.partyId = party.id;
      partyId = party.id;
      loadParty($scope.partyId);
    };

    function loadParty(id) {
      Party.getParty(id).success(function(data) {
        $scope.party = data.party;
        console.log($scope.party);
      });
    }

    $scope.songSelected = function(song) {
      $scope.song = song;
    };

    $scope.onDropDelete = function(song, $event){
      Request.delete(song.id).success(function() {
        loadParty($scope.partyId);
      });
    };

    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: '../views/search.html',
        controller: function($scope, $modalInstance, Party, Request) {
          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };

          $scope.selected = {};

          $scope.search = function(songpull) {
            Party.search(partyId , songpull).success(function(data) {
              $scope.songs = data.videos;
              console.log('search data', data);
            });
          };

          $scope.ok = function(song) {
            $scope.selected.song = song;
            Request.create(song, partyId).success(function(data) {
              console.log('create data', data);
              $modalInstance.close($scope.selected.song);
            });
          }
        },
        size: size,
        resolve: {
          items: function () {
            return $scope.selected;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        console.log('selected items',selectedItem);
        loadParty(partyId);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  });
