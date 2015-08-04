angular
  .module('addressBook')
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
  });
