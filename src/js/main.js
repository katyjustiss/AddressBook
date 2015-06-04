angular
  .module('addressBook', [])

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
        .success(function() {
          console.log(main.people)
          console.log(main.newContact)
          main.people.push(main.newContact);
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


