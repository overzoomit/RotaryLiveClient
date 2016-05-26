'use strict';

app.service('ClubServices', ['$resource', '$q', 'REST_PATH', function ($resource, $q, REST_PATH) {
      

      return $resource(REST_PATH +'/club/:action', {},{
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
                }
	  });

  }]);

app.service('ClubPrivateServices', ['$resource', '$q', 'REST_PATH', function ($resource, $q, REST_PATH) {
      

      return $resource(REST_PATH +'/api/club/:action', {},{
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
                }
      });

  }]);