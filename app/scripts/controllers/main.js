'use strict';

angular.module('musicPcApp')
  .controller('MainCtrl', function ($scope, Auth) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.parties = [
      'party 1',
      'party 2',
      'party 3',
      'party 4',
      'party 5',
      'party 6',
      'party 7',
      'party 8'
    ]

    $scope.songs = [
      'song 1',
      'song 2',
      'song 3',
      'song 4',
      'song 5',
      'song 6',
      'song 7'
    ];

    $scope.partySelected = function(party) {
      alert(party);
    };

    $scope.songSelected = function(song) {
      alert(song);
    };
  });
