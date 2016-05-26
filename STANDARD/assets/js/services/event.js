'use strict';

app.service('EventServices', ['$resource', '$q', 'REST_PATH', function ($resource, $q, REST_PATH) {

      return $resource(REST_PATH +'/api/event/:action/:type', {action:'@action', type:'@type'},{
	  	query: {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    isArray: true,
                    params: {'action' : ''}
                },
        count: {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    params: {'action' : 'count'}
                },
        getOne: {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                },
        update: {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                },
        booking:{
                    methos: 'POST',
                    headers: {'Content-Type': 'application/json'},

                }
	  });

  }]);