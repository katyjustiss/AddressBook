angular
  .module('addressBook', [])

  .controller('Main', function() {
    var main = this;

    main.people = [
      {name: 'Wiggles', email: 'wig@wiggles.com', twitter: '@wiggly', phone: '6155555678', photo: 'http://i.imgur.com/lVlPvCBb.jpg'},
      {name: 'Sunshine', email: 'sun@sunny.com', twitter: '@sunny', phone: '615-123-4567', photo: 'http://i.imgur.com/EpTz5rOb.jpg'},
      {name: 'Pumpkin', email: 'orange@pumpkin.com', twitter: '@plumpy', phone: '6152345678', photo: 'http://i.imgur.com/Z9809Jeb.jpg'},
      {name: 'Princess', email: 'pink@princess.com', twitter: '@princess', phone: '615-666-7890', photo: 'http://i.imgur.com/PISWBXMb.jpg'},
      {name: 'Mario', email: 'mario@plumbers.com', twitter: '@mario', phone: '6159876543', photo: 'http://i.imgur.com/w31FmCJb.jpg'}
    ];

    main.newContact = {};

    main.addNewContact = function() {
      main.people.push(main.newContact);
      main.newContact = {};  //clearing the form and data-binding link
      $('#modal').modal('hide');
    };

    main.removeAddress = function(contact) {
      var index = main.people.indexOf(contact);
      main.people.splice(index, 1);
    }
  });


