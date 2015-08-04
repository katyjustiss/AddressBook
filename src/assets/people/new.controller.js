angular
  .module('addressBook')
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
  });
