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
        controllerAs: 'main'
      })
      .when('/people/new', {
        templateUrl: 'views/people.html',
        controller: 'NewPersonCtrl',
        controllerAs: 'main'
      })
      .when('/people/:id/edit', {
        templateUrl: 'views/person.html',
        controller: 'EditPersonCtrl',
        controllerAs: 'main'
      })
      .when('/people/:id', {
        templateUrl: 'views/person.html',
        controller: 'PersonController',
        controllerAs: 'main'
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

  //CONTROLLER for individual person's information/data
  .controller('PersonController', function($routeParams, Person) {
    var main = this;
    main.id = $routeParams.id;

    Person.getOne(main.id, function (data) {
      main.person = data;
    })
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
  .controller('NewPersonCtrl', function(Person) {
    var main = this;

    main.onModalLoad = function () {
      $('#modal').modal('show');

      $('#modal').on('hidden.bs.modal', function (e) {
        window.location.href = '#/people';
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
  .controller('EditPersonCtrl', function ($routeParams, Person) {
    var main = this;
    main.id = $routeParams.id;

    main.onModalLoad = function () {
      $('#modal').modal('show');

      $('#modal').on('hidden.bs.modal', function (e) {
        window.location.href = `#/people/${main.id}`;
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
  .controller('Main', function(Person) {
    var main = this;

    Person.getAll(function(people) {
      main.people = people;
    })

    main.onModalLoad = function () {};
  });


