angular
  .module('addressBook')
  .run(function($rootScope, $location, API_URL) {
      $rootScope.$on('$routeChangeStart', function(event, nextRoute) {
        var fb = new Firebase(API_URL);
        $rootScope.auth = fb.getAuth();

        if (nextRoute.$$route && nextRoute.$$route.private && !$rootScope.auth) {
          $location.path('/login')
        }
      });
    });
