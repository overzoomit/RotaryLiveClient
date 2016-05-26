'use strict';
/**
 * controller for Messages
 */
app.controller('ChatCtrl', ["$rootScope","$scope", "$state", "principal", "toaster", "$location", "shareObjectService", "UserServices", 
    function ($rootScope, $scope, $state, principal, toaster, $location, shareObjectService, UserServices) {

   
        UserServices.getOne({action:$state.params.id}).$promise.then(function (value){
            $scope.user=value;
            $scope.otherIdUser = value.id;
        });

        if($rootScope.userLogged != null){
             $scope.selfIdUser = $rootScope.userLogged.id;
        }

        if(principal.isAuthenticated() && $rootScope.userLogged == null){
            UserServices.get({action:'me'}).$promise.then(function (value){
                $rootScope.userLogged = value;
                $scope.selfIdUser = $rootScope.userLogged.id;
                if ($rootScope.userLogged.member.job.headline != null && $rootScope.userLogged.member.job.headline != "" && $rootScope.userLogged.member.email!= null && $rootScope.userLogged.member.email!= "" && $rootScope.userLogged.member.mobile!= null && $rootScope.userLogged.member.mobile!= "") {
            $rootScope.fullFill = true ;
        } else {
            $rootScope.fullFill = false;
        };
                
               
            });
        }



   
     
    
    
    $scope.setOtherId = function (value) {

        $scope.otherIdUser = value;
    };
    var exampleDate = new Date().setTime(new Date().getTime() - 240000 * 60);

    $scope.chat = [];

    $scope.sendMessage = function () {
        var newMessage = {
            "user": $rootScope.userLogged.username,
            "avatar": "http://46.252.145.11:8383/attach/thumbnail/"+$rootScope.userLogged.member.photoId,
            "date": new Date(),
            "content": $scope.chatMessage,
            "idUser": $scope.selfIdUser,
            "idOther": $scope.otherIdUser
        };
        $scope.chat.push(newMessage);
        $scope.chatMessage = '';

    };
}]);
