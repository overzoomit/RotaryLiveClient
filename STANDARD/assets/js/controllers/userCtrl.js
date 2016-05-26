'use strict';

app.controller('UserCtrl', ["$scope", "$rootScope", "$state", "ngTableParams", "principal", "toaster", "$location", "shareObjectService", "UserServices", "SweetAlert" ,
    function ($scope, $rootScope, $state, ngTableParams, principal, toaster, $location, shareObjectService, UserServices, SweetAlert) {
    $scope.ldloadingSearch = {};


     
    $scope.setFirstSearchCliente = function(){
        $rootScope.searchCliente = {};
        $rootScope.searchCliente.page = 1;
        $rootScope.searchCliente.filter = "";
        $rootScope.searchCliente.count = 10;
        $rootScope.searchCliente.sorting = 'verified,desc';
    }
    if(angular.isUndefined($rootScope.searchCliente)) {
        $scope.setFirstSearchCliente();
    }else{
        $scope.search = $rootScope.searchCliente.filter;
    }

    $scope.shareObj = function (user){
        shareObjectService.addObject(user);
        $state.go('app.auth.user.detail', {id:user.id});
    }

    $scope.emptyFilterValue = function(){
        $scope.search = "";
        $location.url($location.path());
    }
    

    $scope.tableParams = new ngTableParams({
        page: $rootScope.searchCliente.page,
        count: $rootScope.searchCliente.count,
        sorting:$rootScope.searchCliente.sorting,
        filter:$rootScope.searchCliente.filter
    }, {
        counts:[10,25,50,100],
        getData: function ($defer, params) {
            var queryParams = params.sorting();
                        
            function initFilters(filters, queryParams){

                if("q" in queryParams && !("q" in filters)){
                    filters["q"] = $location.$$search["q"];
                    $scope.search = filters["q"];
                }
                $location.url($location.path());
                return filters;
            }

             var filters = initFilters(params.filter(), $location.$$search);

            $rootScope.searchCliente = params.$params;
            $scope.ldloadingSearch["expand_right"] = true;
            UserServices.get({page:params.page() - 1, size:params.count(), q:params.filter(), sort:params.sorting()}).$promise.then(function(result){
                    params.total(result.page.totalElements);
                    if(angular.isDefined(result._embedded)) $defer.resolve(result._embedded.userList);
                    else $defer.resolve([]);
                    $scope.ldloadingSearch["expand_right"] = false;
            }, function(error){
                toaster.pop('error', 'ops! there are some error', error);
                $scope.ldloadingSearch["expand_right"] = false;
            });
        }
    });
    

    
}]);


app.controller('UserMeCtrl', ["$scope", "$rootScope", "$state", "principal", "toaster", "$location", "shareObjectService", "UserServices", 
    function ($scope, $rootScope, $state, principal, toaster, $location, shareObjectService, UserServices) {
    
    $scope.filter = {};

    $scope.chat=function(user){

        
        $state.go('app.auth.user.chat', {id:user.id});
    };

    /**
    * Chiamata al server con il filtro impostato
    */
    $scope.callServer = function(){
        UserServices.get({page:0, size:20}).$promise.then(function(result){
            if(angular.isDefined(result._embedded)) $scope.users = result._embedded.userList;
        });
    }
    $scope.callServer();
       
    $scope.shareObj = function (user){
        shareObjectService.addObject(user);
        $state.go('app.auth.user.detail', {id:user.id});
    }
    
}]);


app.controller('UserDetailCtrl', ["$scope", "$rootScope", "$state", "principal", "toaster", "$location", "shareObjectService", "UserServices", 
    function ($scope, $rootScope, $state, principal, toaster, $location, shareObjectService, UserServices) {
    
    if(angular.isUndefined(shareObjectService.getObject())){
        $scope.user = UserServices.getOne({action:$state.params.id});

    }else{
        $scope.user = shareObjectService.getObject();
        shareObjectService.addObject(undefined);
    }
       
    $scope.shareObj = function (user){
        shareObjectService.addObject(user);
        $state.go('app.auth.user.modify', {id:user.id});
    }
    
}]);

app.controller('UserEditCtrl', ["$scope", "$rootScope", "$state", "$q", "$cookieStore", "principal", "SweetAlert", "toaster", "$location", "shareObjectService", "FileUploader", "UserServices", "ClubServices", 
    function ($scope, $rootScope, $state, $q, $cookieStore, principal, SweetAlert, toaster, $location, shareObjectService, FileUploader, UserServices, ClubServices) {
    
    if(angular.isUndefined(shareObjectService.getObject())){
        $scope.user = UserServices.getOne({action:$state.params.id});

    }else{
        $scope.user = shareObjectService.getObject();
        shareObjectService.addObject(undefined);
    }

    if ($rootScope.isAdmin($rootScope.userLogged)){
         $scope.admin= true;
     } else{
        $scope.admin= false;
     }
       
    $scope.ldloadingSearch = {};

    $scope.$watch('user.club', function(newValue, oldValue){
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
            $scope.user.club = null; 
            $scope.Form.clubName.$setValidity('used', false);
        }else{
            $scope.user.club = angular.copy($item);
            $scope.Form.clubName.$setValidity('used', true);
        }    
    }

// ottiene lo user e fa un redirect del dettaglio utente
    function getUserAndRedirect(){
        UserServices.getOne({action:$scope.user.id}).$promise.then(function(val){
            $scope.user = val;
            shareObjectService.addObject($scope.user);
            $state.go('app.auth.user.detail', {id:$scope.user.id});
        });
    }

    $scope.saveUser = function(){
        console.log($scope.myImage);
        UserServices.update({action: $scope.user.id}, $scope.user).$promise.then(function(user){
            //save cropped
            if(angular.isDefined($scope.myImage) && $scope.myImage != '') {
                $scope.salvaImmagine();
                return;
            }
            if($scope.user.id==$rootScope.userLogged.id){
                $rootScope.userLogged= $scope.user;
                if ($rootScope.userLogged.member.job.headline != null && $rootScope.userLogged.member.job.headline != "" && $rootScope.userLogged.member.email!= null && $rootScope.userLogged.member.email!= "" && $rootScope.userLogged.member.mobile!= null && $rootScope.userLogged.member.mobile!= "") {
            $rootScope.fullFill = true ;
        } else {
            $rootScope.fullFill = false;
        };
            }
            SweetAlert.swal("Success!", "Member is saved!", "success");
            getUserAndRedirect();

        }, function(error){
            if (error.status == 423) {
                $scope.Form.clubName.$setValidity('used', false);
                angular.element('.ng-invalid[name=clubName]').focus();
            } else {
                SweetAlert.swal("Ops something get error!", "Reload page and try again!", "error");
            }

        });
    }

    function removeThisUser(){
        var deferrer = $q.defer();
        UserServices.remove({action: $scope.user.id}).$promise.then(function(value){
            return deferrer.resolve({text:"Delete Sucessfull!", status:"success"});
        }, function(error){
            return deferrer.reject({text:"Error to delete", status:"error"});
        });
        return deferrer.promise;
    }

    $scope.removeUser = function(){
        SweetAlert.swal({
                title: "Do you want remove Member?",
                text: "Your will not be able to recover this member",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#007AFF",
                confirmButtonText: "Yes, Delete!",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if(isConfirm) removeThisUser().then(function(value){
                                    SweetAlert.swal({title:value.text, type:value.status, confirmButtonColor:"#007AFF"});
                                    $state.go('app.auth.user.list');  
                                }, function(value){
                                    SweetAlert.swal({title:value.text, type:value.status, confirmButtonColor:"#007AFF"});  
                                });
            });
    }

    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    /**
    * Converts data uri to Blob. Necessary for uploading.
    * @see
    *   http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    * @param  {String} dataURI
    * @return {Blob}
    */
    var dataURItoBlob = function(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mimeString});
    };
    
    var uploader = $scope.uploader = new FileUploader({
        url: $rootScope.restPath + '/api/member/'+ $state.params.id +'/image',
            headers : {
                'Authorization': 'Bearer ' + $cookieStore.get('identity').access_token,
                'Accept': 'application/json, text/plain, */*'
            },
            method: 'POST',
            autoUpload: false
    });

    $scope.salvaImmagine = function(){
        var blob = dataURItoBlob($scope.myCroppedImage);
        uploader.addToQueue(blob);
        uploader.uploadAll();
    }

    uploader.onCompleteAll = function() {
        SweetAlert.swal("Success!", "Member is saved!", "success");
        getUserAndRedirect();
    };

    //se non sei amministratore controlla se stai visualizzando il proprio utente 
    $scope.permessoUserMe = function(){
        if ($rootScope.isAdmin($rootScope.userLogged)) return true;
        if ($scope.user.id == $rootScope.userLogged.id) return true;
        return false;
    }
    


}]);

app.controller('UserNewCtrl', ["$scope", "$rootScope", "$state", "$q", "$cookieStore", "principal", "SweetAlert", "toaster", "$location", "FileUploader", "shareObjectService", "UserServices", "ClubServices", 
    function ($scope, $rootScope, $state, $q, $cookieStore, principal, SweetAlert, toaster, $location, FileUploader, shareObjectService, UserServices, ClubServices) {

        $scope.user = {
                    verified:  true, 
                    member: {gender: 'male'}
                    };

        $scope.$watch('user.club', function(newValue, oldValue){
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
                $scope.user.club = null; 
                $scope.Form.clubName.$setValidity('used', false);
            }else{
                $scope.user.club = angular.copy($item);
                $scope.Form.clubName.$setValidity('used', true);
            }    
        }

        $scope.saveUser = function(){
            $scope.user.name = $scope.user.member.firstName + " " + $scope.user.member.lastName;
            UserServices.save($scope.user).$promise.then(function(user){
               
                SweetAlert.swal("Success!", "New Member is Saved!", "success");
                $state.go('app.auth.user.list');
            }, function(error){
                if (error.status == 423) {
                    $scope.Form.clubName.$setValidity('used', false);
                    angular.element('.ng-invalid[name=clubName]').focus();
                } else {
                    SweetAlert.swal("Ops something get error!", "Reload page and try again!", "error");
                }

            });
        }
}]);