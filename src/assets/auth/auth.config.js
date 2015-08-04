angular
  .module('addressBook')
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'assets/auth/login.html', //relative to where your app is running from?
        controller: 'LoginCtrl',
        controllerAs: 'auth',
        resolve: {
          checkLogin: function ($rootScope, $location) {
            if ($rootScope.auth) {
              $location.path('/people')
            }
          }
        }
      })
      .when('/logout', {
        template: '<h1> Logging out...</h1>',
        controller: 'LogoutCtrl',
      })
  });
