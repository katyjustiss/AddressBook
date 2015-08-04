// angular
//   .module('addressBook')
//   .factory('Auth', function($rootScope, API_URL) { //The auth angular obj has the data I need. How to access?
//       var main = this;
//       var fb = new Firebase(API_URL);

//       return {
//         // Auth.requireLogin = function() {

//         // },
//         login(data, cb) { //confused about what to pass in here
//           fb.authWithPassword({
//           email: main.email,
//           password: main.password
//         }, function (err, authData) {
//           if (err) {
//             console.log('Error', err)
//           } else {
//             // $rootScope.auth = authData;
//             // $location.path('/people');
//             // $scope.$apply();
//             console.log(authData)
//           }
//         })
//         },
//         logout() {
//           fb.unauth();
//         }
//       }
//     });
