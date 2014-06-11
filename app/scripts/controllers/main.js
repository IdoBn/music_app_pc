'use strict';

angular.module('musicPcApp')
  .controller('MainCtrl', function ($scope, Auth, Party, Request) {
    Party.getUserParties().success(function(data) {
      $scope.parties = data.user.parties;
    });

    $scope.partySelected = function(party) {
      $scope.partyId = party.id;
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
  });
