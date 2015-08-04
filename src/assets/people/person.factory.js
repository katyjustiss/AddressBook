angular
  .module('addressBook')
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
    });
