angular
  .module('addressBook', ['ngRoute'])

  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/people', {
        templateUrl: 'views/people.html',
        controller: 'Main',
        controllerAs: 'main'
      })
      .when('/people/:id', {
        templateUrl: 'views/person.html',
        controller: 'PersonController',
        controllerAs: 'person'
      })
      .otherwise({
        templateURL: 'views/404.html'
      });
  })

    .filter('objToArr', function() {
      return function(obj) {
        if(obj) {
          return Object
            .keys(obj)
            .map(function(key) {
              obj[key]._id = key  //Getting the person obj. Adding the _id property to this object
              return obj[key];
          })
        }
      }
    })

  .controller('PersonController', function($http, $routeParams) {
    var main = this;
    var id = $routeParams.id;

    $http
      .get(`https://addressbooks.firebaseio.com/people/${id}.json`)
      .success(function (data) {
        main.data = data;
      });
  })

  .controller('Main', function($http) {
    var main = this;

    $http
      .get('https://addressbooks.firebaseio.com/people.json')
      .success(function (data) {
        main.people = data;
      })

    main.newContact = {};

    main.addNewContact = function() {
      $http
        .post('https://addressbooks.firebaseio.com/people.json', main.newContact)
        .success(function(res) {
          main.people[res.name] = main.newContact;
          main.newContact = {};  //clearing the form and data-binding link
          $('#modal').modal('hide');
        });
    };

    main.removeAddress = function(id) {
      $http
        .delete(`https://addressbooks.firebaseio.com/people/${id}.json`)
        .success(function() {
          delete main.people[id]
      });
    };
  });


