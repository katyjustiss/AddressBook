angular
  .module('addressBook', ['ngRoute'])

  .constant('API_URL', 'https://addressbooks.firebaseio.com')

  .config(function($routeProvider) {
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
        controllerAs: 'main',
        private: true
      })
      .when('/people/new', {
        templateUrl: 'views/people.html',
        controller: 'NewPersonCtrl',
        controllerAs: 'main',
        private: true
      })
      .when('/people/:id/edit', {
        templateUrl: 'views/person.html',
        controller: 'EditPersonCtrl',
        controllerAs: 'main',
        private: true
      })
      .when('/people/:id', {
        templateUrl: 'views/person.html',
        controller: 'PersonController',
        controllerAs: 'main',
        private: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
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
      .otherwise({
        templateURL: 'views/404.html'
      });
  })

  .run(function($rootScope, $location, API_URL) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute) {
      var fb = new Firebase(API_URL);
      $rootScope.auth = fb.getAuth();

      if (nextRoute.$$rouet && nextRoute.$$route.private && !$rootScope.auth) {
        $location.path('/login')
      }
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

  .controller('LogoutCtrl', function ($rootScope, $scope, $location, API_URL) {
    var fb = new Firebase(API_URL);

    fb.unauth(function () {
      $rootScope.auth = null;
      $location.path('/login');
      $scope.$apply();
    });
  })

  .controller('LoginCtrl', function ($rootScope, $scope, $location, API_URL) {
    var main = this;

    main.login = function () {
      var fb = new Firebase(API_URL);

      fb.authWithPassword({
        email: main.email,
        password: main.password
      }, function (err, authData) {
        if (err) {
          console.log('Error', err)
        } else {
          $rootScope.auth = authData;
          $location.path('/people');
          $scope.$apply();
        }
      });

    };

    main.register = function () {
      // var fb = new Firebase(API_URL);
      // fb.createUser({
      //   email: main.email,
      //   password: main.password
      // }, function(err, userData) {
      //   if(err) {
      //     console.log('Error', err)
      //   } else {
      //     main.login();
      //     console.log('successful')
      //   }
      // });
    };
  })



  //CONTROLLER for individual person's information/data
  .controller('PersonController', function($routeParams, $location, Person) {
    var main = this;
    main.id = $routeParams.id;

    Person.getOne(main.id, function (data) {
      main.person = data;
    })

    main.destroy = function (id) {   //doesn't seem to delete from firebase
      Person.destroy(main.id, function () {
        $location.path('/people');
      });
    };

    main.onModalLoad = function () {};
  })

  .factory('Person', function($http, API_URL) {
    return {
      getOne(id, cb) { //ES6 enhanced obj literal. Old version - getOne: function(id, cb) {
        $http
          .get(`${API_URL}/people/${id}.json`) //returning an obj with a prop of getOne
          .success(cb);
      },
      getAll(cb) {
        $http
          .get(`${API_URL}/people/.json`)
          .success(cb);
      },
      create(data, cb) {
        $http
          .post(`${API_URL}/people.json`, data)
          .success(cb);
      },
      update(id, data, cb) {
        $http
          .put(`${API_URL}/people/${id}.json`, data)
          .success(cb);
      },
      destroy(id, cb) {
        $http
          .delete(`${API_URL}/people/${id}.json`)
          .success(cb);
      }
    }
  })


  //CONTROLLER TO ADD PERSON INFORMATION
  .controller('NewPersonCtrl', function($scope, $location, Person) {
    var main = this;

    main.onModalLoad = function () {
      $('#modal').modal('show');

      $('#modal').on('hidden.bs.modal', function (e) {
        $location.path('/people');
        $scope.$apply();
      });
    };

    main.saveAddress = function() {
      Person.create(main.person, function() { //need to pass main.person to the model
        $('#modal').modal('hide');
      })
    };
      Person.getAll(function (people) {
        main.people = people;
      });
  })


  //CONTROLLER TO EDIT PERSON INFORMATION
  .controller('EditPersonCtrl', function ($scope, $routeParams, $location, Person) {
    var main = this;
    main.id = $routeParams.id;

    main.onModalLoad = function () {
      $('#modal').modal('show');

      $('#modal').on('hidden.bs.modal', function (e) {
        $location.path(`/people/${main.id}`);
        $scope.$apply();
      });
    };

    main.saveAddress = function () {
      Person.update(main.id, main.person, function () {
        $('#modal').modal('hide');
      });
    };

    Person.getOne(main.id, function (person) {
      main.person = person;
    });
  })

  //GETTING ALL THE PEOPLE ON LOAD
  .controller('Main', function($rootScope, $location, Person) {
    var main = this;

    Person.getAll(function(people) {
      main.people = people;
    })

    main.onModalLoad = function () {};
  });


