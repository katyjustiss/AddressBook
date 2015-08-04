angular
  .module('addressBook')
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
  });
