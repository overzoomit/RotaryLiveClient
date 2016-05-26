'use strict';

app.controller('signupCtrl', ["$scope", "$rootScope", "SweetAlert", "principal", "$state", "$stateParams", "SignupServices", "ClubServices", 
    function ($scope, $rootScope, SweetAlert, principal, $state, $stateParams, SignupServices, ClubServices) {
    

    $scope.form = {
        submit: function (form) {
            var firstError = null;
            if (form.$invalid) {

                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }

                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");
                return;

            } else {
                $scope.newUser.username = angular.lowercase($scope.newUser.username);
                SignupServices.save($scope.newUser).$promise.then(function(val){
                    SweetAlert.swal("Success!", "Wait for the administrator grant to log in!", "success");
                    $state.go('login.signin');
                }, function(error){
                    if (error.status == 409) {
                        form.username.$setValidity('used', false);
                        angular.element('.ng-invalid[name=username]').focus();
                    } else {
                        SweetAlert.swal("Ops something get error!", "Reload page and try again!", "error");
                    }

                });
            }
        },
        reset: function (form) {
            $scope.newUser = {};
            form.$setPristine(true);
        }

    };

    $scope.$watch('newUser.username', function(newValue, oldValue){
        if( newValue != oldValue ) $scope.Form.username.$setValidity('used', true);
    });

    $scope.$watch('newUser.club', function(newValue, oldValue){
        if( newValue != oldValue ) 
            if(angular.isDefined(newValue.name)) $scope.Form.clubName.$setValidity('used', true);
            else $scope.Form.clubName.$setValidity('used', false);
    });
    

    $scope.getClub = function(val) {
        return ClubServices.get({q:val}).$promise.then(function(response){
            return response._embedded.clubList;
        });
    };

    $scope.clubSelected = function ($item){
        if(angular.isUndefined($item) || $item.id == null){
            $scope.newUser.club = null;
            $scope.Form.clubName.$setValidity('used', false);
        }else{
            $scope.newUser.club = angular.copy($item);
            $scope.Form.clubName.$setValidity('used', true);
        }    
    }

}]);

app.controller('forgotCtrl', ["$scope", "$rootScope", "SweetAlert", "principal", "$state", "$stateParams", "ForgotServices", 
    function ($scope, $rootScope, SweetAlert, principal, $state, $stateParams, ForgotServices) {

        $scope.submitForgot = function(){
            var username = angular.lowercase($scope.data.username);
            ForgotServices.save({username:username}).$promise.then(function(value){
                console.log(value);
                SweetAlert.swal("Email sent!", "Check your email address to reset your password!", "success");
            }, function(error){
                SweetAlert.swal("Ops something get error!", "Reload page and try again!", "error");
            });
        }

    }]);

app.controller('resetCtrl', ["$scope", "$rootScope", "$state", "SweetAlert", "principal", "$stateParams", "ResetServices", 
    function ($scope, $rootScope, $state, SweetAlert, principal, $stateParams, ResetServices) {

        console.log($state.params.code);

        $scope.submitReset = function(){
            ResetServices.save({code:$state.params.code, password:$scope.password}).$promise.then(function(value){
                SweetAlert.swal("Password changed!", "Enjoy your Rotary Live!", "success");
                $state.go()
            }, function(error){
                SweetAlert.swal("Ops something get error!", "Reload page and try again!", "error");
            });
        }

    }]);
