'use strict';

angular.module('musicPcApp')
  .controller('LoginCtrl', function ($scope, $state, OpenFB, $rootScope) {
    $scope.logout = function () {
      OpenFB.logout();
      $state.go('login');
    };

    $scope.revokePermissions = function () {
      OpenFB.revokePermissions().then(
      function () {
        $state.go('login');
      },
      function () {
        alert('Revoke permissions failed');
      });
    };

    $scope.login = function () {
      OpenFB.login('email,read_stream').then(
        function () {
          $rootScope.$on('user.set', function() {
            $state.go('main');
          });
        },
        function () {
          alert('OpenFB login failed');
        });
    };

    // $rootScope.$on('CURRENT_USER_SET', function() {
    //   $scope.user = AuthUser.getCurrentUser();
    //   console.log($scope.user);
    // });
  });
