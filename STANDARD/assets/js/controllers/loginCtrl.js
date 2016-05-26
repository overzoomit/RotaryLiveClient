'use strict';

app.controller('loginCtrl', ["$scope", "$rootScope", "$cookieStore", "principal", "$http", "$state", "$stateParams", "$httpParamSerializer", "REST_PATH", "UserServices", 
    function ($scope, $rootScope, $cookieStore, principal, $http, $state, $stateParams, $httpParamSerializer, REST_PATH, UserServices) {
    

    $scope.data = {grant_type:"password", username: "", password: "", client_id: "rotarylive", device_id: $state.params.id};
    $scope.encoded = btoa("rotarylive:HgjF3RAxWBKJq6qb");
    
    function isAdmin(value){
        if(value.roles !== null && !angular.equals({}, value.roles) && value.roles[0] !== null &&
            value.roles[0].authority === "ROLE_ADMIN") return true;
        return false;
    } 

    $scope.login = function() {
        $scope.data.username = angular.lowercase($scope.data.username);
        var req = { method: 'POST', url: REST_PATH + "/oauth/token",
                    headers: {
                            "Authorization": "Basic " + $scope.encoded,
                            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                    },
                    data: $httpParamSerializer($scope.data)
        }

        $http(req).then(function(data){
            principal.authenticate(data.data);
            UserServices.get({action:'me'}).$promise.then(function (value){
                $rootScope.userLogged = value;
                if ($rootScope.userLogged.member.job.headline != null && $rootScope.userLogged.member.job.headline != "" && $rootScope.userLogged.member.email!= null && $rootScope.userLogged.member.email!= "" && $rootScope.userLogged.member.mobile!= null && $rootScope.userLogged.member.mobile!= "") {
            $rootScope.fullFill = true ;
        } else {
            $rootScope.fullFill = false;
        };
                if(isAdmin(value)) $state.go('app.auth.user.list');
                else $state.go('app.auth.user.listme');
            },function (error){
                if(isAdmin(error.data)) $state.go('app.auth.user.list');
                else principal.logout();
                
                $scope.data.password = ""; 
                $scope.messageError = {text:'Bad Request', stato:'danger'};

                if(error.status == 423){
                    $scope.messageError = {text:'You need to be granted by admin account, try later.', stato:'warning'};
                }
                
            });
            
        }, function(error){
            $scope.data.password = ""; 
            $scope.messageError = {};
            $scope.messageError = {text:'Bad Request', stato:'danger'};
            if(error.status == 400){
                $scope.messageError = {text:'Bad Credentials', stato:'danger'};
            }
        }); 
    }

    // $scope.login = function(){
    //     auth.auth({username: $scope.username, password: $scope.password}).$promise.then(function(response){
    //         principal.authenticate(response);

    //         var identityUser = $cookieStore.get("identity");
    //         if(!angular.isUndefined(identityUser)) {
    //             if(identityUser.roles == "{ROLE_ADMIN=true}"){
    //                 $rootScope.isAdmin = true;
    //             }else if(identityUser.roles == "{ROLE_COMMERCIALE=true}"){
    //                  $rootScope.isCommerciale = true;
    //             }else if(identityUser.roles == "{ROLE_GRAFICA=true}"){
    //                  $rootScope.isGrafica = true;
    //             }else if(identityUser.roles == "{ROLE_STAMPA=true}"){
    //                  $rootScope.isStampa = true;
    //             }else if(identityUser.roles == "{ROLE_AGENTE=true}"){
    //                  $rootScope.isAgente = true;
    //             }
    //         }

    //         if(principal.isInRole("ROLE_STAMPA") || principal.isInRole("ROLE_GRAFICA")){
    //             $state.go('reparti.user.listagrafica');
    //         }else if(principal.isInRole("ROLE_OPERAIO")){
    //             $state.go('reparti.user.listaoperativita');
    //         }else if(principal.isInRole("ROLE_AGENTE")){
    //             $state.go('agenti.user.listfromcategoria');
    //         }else{
    //             if($rootScope.returnToState){
    //                 //da verificare il passaggio dei parametri se funziona correttamente.
    //                 // var paramsArr = (val for key, val of $rootScope.returnToStateParams);
    //                 $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
    //             }else{
    //                 $state.go('app.user.dashboard');
    //             } 
    //         }

            
    //     }, function(reason) {
    //         $scope.$error = "Wrong Username/Email and password combination.";
    //         $scope.alert="Wrong Username/Email and password combination.";
    //         $scope.password = "";
    //     });
        
    // }
    
}]);