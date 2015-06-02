angular
  .module('addressBook', [])

  .controller('Main', function() {
    var main = this;

    main.people = [
      {name: 'Wiggles', email: 'wig@wiggles.com', twitter: '@wiggly'},
      {name: 'Sunshine', email: 'sun@sunny.com', twitter: '@sunny'},
      {name: 'Pumpkin', email: 'orange@pumpkin.com', twitter: '@plumpy'},
      {name: 'Princess', email: 'pink@princess.com', twitter: '@princess'},
      {name: 'Mario', email: 'mario@plumbers.com', twitter: '@mario'},
    ];

    main.newContact = {};

    main.addNewContact = function() {
      main.people.push(main.newContact);
      main.newContact = {};  //clearing the form and data-binding link
    };

    main.removeAddress = function(contact) {
      var index = main.people.indexOf(contact);
      main.people.splice(index, 1);
    }
  });


