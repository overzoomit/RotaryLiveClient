app.service('shareObjectService', function() {
  var product;
  
  var addObject = function(obj) {
      product = obj;
  };

  var getObject = function(){
      return product;
  };
   

  return {
    addObject: addObject,
    getObject: getObject
  };
  
  

});