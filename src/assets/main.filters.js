angular
  .module('addressBook')
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
  });
