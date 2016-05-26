'use strict';

app.controller('ClubCtrl', ["$scope", "$rootScope", "$state", "ngTableParams", "principal", "toaster", "$location", "shareObjectService", "ClubPrivateServices", 
    function ($scope, $rootScope, $state, ngTableParams, principal, toaster, $location, shareObjectService, ClubPrivateServices) {
    $scope.ldloadingSearch = {};
    
    $scope.setFirstSearchClub = function(){
        $rootScope.searchClub = {};
        $rootScope.searchClub.page = 1;
        $rootScope.searchClub.filter = "";
        $rootScope.searchClub.count = 10;
        $rootScope.searchClub.sorting = { id:'desc' };
    }
    if(angular.isUndefined($rootScope.searchClub)) {
        $scope.setFirstSearchClub();
    }else{
        $scope.search = $rootScope.searchClub.filter;
    }

    $scope.shareObj = function (user){
        shareObjectService.addObject(user);
        $state.go('app.auth.club.detail', {id:user.id});
    }

    $scope.emptyFilterValue = function(){
        $scope.search = "";
        $location.url($location.path());
    }
    

    $scope.tableParams = new ngTableParams({
        page: $rootScope.searchClub.page,
        count: $rootScope.searchClub.count,
        sorting:$rootScope.searchClub.soting,
        filter:$rootScope.searchClub.filter
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

            $rootScope.searchClub = params.$params;
            $scope.ldloadingSearch["expand_right"] = true;
            ClubPrivateServices.get({page:params.page() - 1, size:params.count(), q:params.filter(), sort:params.sorting()}).$promise.then(function(result){
                    params.total(result.page.totalElements);
                    if(angular.isDefined(result._embedded)) $defer.resolve(result._embedded.clubList);
                    else $defer.resolve([]);
                    $scope.ldloadingSearch["expand_right"] = false;
            }, function(error){
                toaster.pop('error', 'ops! there are some error', error);
                $scope.ldloadingSearch["expand_right"] = false;
            });
        }
    });
    

    
}]);

app.controller('ClubDetailCtrl', ["$scope", "$rootScope", "$state", "principal", "toaster", "$location", "shareObjectService", "ClubPrivateServices", 
    function ($scope, $rootScope, $state, principal, toaster, $location, shareObjectService, ClubPrivateServices) {
    
    if(angular.isUndefined(shareObjectService.getObject())){
        $scope.club = ClubPrivateServices.getOne({action:$state.params.id});

    }else{
        $scope.club = shareObjectService.getObject();
    }
       
    $scope.shareObj = function (user){
        shareObjectService.addObject(user);
        $state.go('app.auth.club.modify', {id:user.id});
    }
    
}]);

app.controller('ClubEditCtrl', ["$scope", "$rootScope", "$state", "$q", "$cookieStore", "principal", "SweetAlert", "FileUploader", "toaster", "$location", "shareObjectService", "UserServices", "ClubPrivateServices", 
    function ($scope, $rootScope, $state, $q, $cookieStore, principal, SweetAlert, FileUploader, toaster, $location, shareObjectService, UserServices, ClubPrivateServices) {
    
    if(angular.isUndefined(shareObjectService.getObject())){
        $scope.club = ClubPrivateServices.getOne({action:$state.params.id});

    }else{
        $scope.club = shareObjectService.getObject();
    }
       
    $scope.ldloadingSearch = {};

    // ottiene il club e fa un redirect del dettaglio utente
    function getClubAndRedirect(){
        ClubPrivateServices.getOne({action:$scope.club.id}).$promise.then(function(val){
            $scope.club = val;
            shareObjectService.addObject($scope.club);
            $state.go('app.auth.club.detail', {id:$scope.club.id});
        });
    }

    $scope.saveClub = function(){
        ClubPrivateServices.update({action: $scope.club.id}, $scope.club).$promise.then(function(club){
            //save cropped
            if(angular.isDefined($scope.myImage) && $scope.myImage != '') {
                $scope.salvaImmagine();
                return;
            }

            SweetAlert.swal("Success!", "Member is saved!", "success");
            getClubAndRedirect();
        });
    }

    function removeThisClub(){
        var deferrer = $q.defer();
        ClubPrivateServices.remove({action: $scope.club.id}).$promise.then(function(value){
            return deferrer.resolve({text:"Delete Sucessfull!", status:"success"});
        }, function(error){
            return deferrer.reject({text:"Error to delete", status:"error"});
        });
        return deferrer.promise;
    }

    $scope.removeClub = function(){
        SweetAlert.swal({
                title: "Do you want remove this Club?",
                text: "Your will not be able to recover this club",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#007AFF",
                confirmButtonText: "Yes, Delete!",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if(isConfirm) removeThisClub().then(function(value){
                                    SweetAlert.swal({title:value.text, type:value.status, confirmButtonColor:"#007AFF"});
                                    $state.go('app.auth.club.list');  
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
        url: $rootScope.restPath + '/api/club/'+ $state.params.id +'/image',
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
        getClubAndRedirect();
    };
    
}]);

app.controller('ClubNewCtrl', ["$scope", "$rootScope", "$state", "$q", "principal", "SweetAlert", "toaster", "$location", "shareObjectService", "UserServices", "ClubPrivateServices", 
    function ($scope, $rootScope, $state, $q, principal, SweetAlert, toaster, $location, shareObjectService, UserServices, ClubPrivateServices) {

        $scope.saveClub = function(){
            ClubPrivateServices.save($scope.club).$promise.then(function(user){
                SweetAlert.swal("Success!", "New Club is Saved!", "success");
                $state.go('app.auth.club.list');
            }, function(error){
                SweetAlert.swal("Ops something get error!", "Reload page and try again!", "error");
            });
        }
}]);