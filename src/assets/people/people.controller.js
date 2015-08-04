angular
  .module('addressBook')
  //GETTING ALL THE PEOPLE ON LOAD
  .controller('PeopleCtrl', function($rootScope, $location, Person) {
    var main = this;

    Person.getAll(function(people) {
      main.people = people;
    })

    main.onModalLoad = function () {};
  });
