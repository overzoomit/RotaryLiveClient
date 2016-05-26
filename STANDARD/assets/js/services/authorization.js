'use strict';

app.factory('authorization', ['$rootScope', '$state', 'principal', '$location', function ($rootScope, $state, principal, $location) {
    return {
      authorize: function() {
        return principal.identity()
          .then(function() {
            var isAuthenticated = principal.isAuthenticated();
            if ($rootScope.toState.name.indexOf("login.") == -1){
              if (isAuthenticated) {
                    //controllo che se non è commerciale o admin va al login se non ha i permessi
                    // if(angular.isDefined(role)){
                    //   if(role == "ROLE_COMMERCIALE" && !(principal.isInRole(role) || principal.isInRole("ROLE_ADMIN"))) $state.go("login.signin");
                    //     if(role == "ROLE_AGENTE" && !principal.isInRole(role)) $state.go("login.signin");
                    //     if(role == "ROLE_STAMPA" && !(principal.isInRole(role) || principal.isInRole("ROLE_GRAFICA") || principal.isInRole("ROLE_OPERAIO"))) $state.go("login.signin"); 
                    // }
                }else {
                  // user is not authenticated. stow the state they wanted before you
                  // send them to the signin state, so you can return them when you're done
                  $rootScope.returnToState = $rootScope.toState;
                  $rootScope.returnToStateParams = $rootScope.toStateParams;
                  // now, send them to the signin state so they can log in
                  $state.go("login.signin");
                  //$rootScope.locationSearch = $location.search();
                  //$location.path('/login/signin').search($location.search());
                }
            }
          });
      }
    };
  }
]);
