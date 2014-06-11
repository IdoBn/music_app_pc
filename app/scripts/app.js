'use strict';

angular
  .module('musicPcApp', [
    'ui.router',
    'openfb',
    'ngCookies',
    'ui.utils',
    'ngDragDrop'
  ])
  .run(function($rootScope, $state, OpenFB, Auth, $cookieStore) {
    OpenFB.init('1417458451820697', 'http://127.0.0.1:9000/oauthcallback.html');
    //http://127.0.0.1:9000/views/oauthcallback.html
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      if (toState.name != 'login') {
        if (!Auth.loggedIn()) {
          if ($cookieStore.get('user') != null) {
            Auth.setUser($cookieStore.get('user'));
          } else {
            $rootScope.error = 'Access denied';
            $state.go('login');
            event.preventDefault();
          }
        }
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });
  });
