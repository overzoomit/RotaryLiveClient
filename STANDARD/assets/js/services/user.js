'use strict';

app.service('UserServices', ['$resource', '$q', 'REST_PATH', function ($resource, $q, REST_PATH) {

      return $resource(REST_PATH +'/api/user/:action', {},{
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

app.service('SignupServices', ['$resource', '$q', 'REST_PATH', function ($resource, $q, REST_PATH) {

      return $resource(REST_PATH +'/signup/:action', {},{
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

app.service('ForgotServices', ['$resource', '$q', 'REST_PATH', function ($resource, $q, REST_PATH) {

      return $resource(REST_PATH +'/forgot_password/:action', {username:'@username'},{
        update: {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                }
      });

  }]);

app.service('ResetServices', ['$resource', '$q', 'REST_PATH', function ($resource, $q, REST_PATH) {

      return $resource(REST_PATH +'/reset_password/:action', {code:'@code', password:'@password'},{
        update: {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                }
      });

  }]);
