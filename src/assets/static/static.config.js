angular
  .module('addressBook')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'assets/static/landing.html'
      })
      .when('/contact', {
        templateUrl: 'assets/static/contact.html'
      })
      .when('/about', {
        templateUrl: 'assets/static/about.html'
      })
      .otherwise({
        templateURL: 'assets/static/404.html'
      });
  });
