angular
  .module('addressBook')

  .controller('LoginCtrl', function ($rootScope, $scope, $location, API_URL, Person) {
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
      var fb = new Firebase(API_URL);
      fb.createUser({
        email: main.email,
        password: main.password
      }, function(err, userData) {
        if(err) {
          console.log('Error', err)
        } else {
          Person.create(main.email, main.password, function() {
            main.login(main.email, main.password);
            console.log('successful')
          })
        };
      });
    };

  });
