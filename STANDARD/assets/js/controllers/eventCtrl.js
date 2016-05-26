'use strict';

app.controller('eventCtrl', ["$scope", "$rootScope", "$state", "ngTableParams", "principal", "SweetAlert", "$location", "shareObjectService", "EventServices", 
    function ($scope, $rootScope, $state, ngTableParams, principal, SweetAlert, $location, shareObjectService, EventServices) {

        $scope.noEvents= false;
    	$scope.moment = moment;

    	EventServices.get({action:'timeline', size:30}).$promise.then(function(result){
    		if(angular.isDefined(result._embedded)) $scope.events = result._embedded.eventList;
            if (angular.isUndefined($scope.events)){
                $scope.noEvents=true;
            } else {
                $scope.noEvents= false;
    		for(var i=0; i<$scope.events.length; i++){
    			$scope.events[i].startDateMonth = moment($scope.events[i].startDate).format('MMMM YYYY');
    		}
        }
    	});

        $scope.bookingEvent = function(event){
            SweetAlert.swal({
                title: "Are you sure?",
                text: "You're going to partecipate the event!",
                type: "warning",
                showCancelButton: true,
                // confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, book it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    EventServices.save({action:event.id, type:'booking'}).$promise.then(function(){
                        SweetAlert.swal("Reserved!", "Event has been reserved.", "success");
                    }, function(error){
                        if(error.status == 409) SweetAlert.swal("Info", "You are alredy reserved!", "info");
                        else  SweetAlert.swal("Error", "No action was taken", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelled", "No action was taken", "error");
                }
            });
        };

        $scope.goDetail = function (event){
            
                $state.go('app.auth.event.detail', {id:event.id});
    }

        $scope.unbook= function(event){
             SweetAlert.swal({
                title: "Are you sure?",
                text: "You're about to unbook from this event!",
                type: "warning",
                showCancelButton: true,
                // confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, unbook me!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    EventServices.remove({action:event.id, type:'booking'}).$promise.then(function(){
                        SweetAlert.swal("Unbooked!", "Booking has been cancelled.", "success");
                    }, function(error){
                        if(error.status == 409) SweetAlert.swal("Info", "You are not booked!", "info");
                        else  SweetAlert.swal("Error", "No action was taken", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelled", "No action was taken", "error");
                }
            });
        }

    }]);

app.controller('eventDetailCtrl',["$scope", "$rootScope","UserServices","$cookieStore","moment", "$state", "ngTableParams", "principal", "SweetAlert", "$location", "shareObjectService", "EventServices",
    function ($scope, $rootScope, UserServices, $cookieStore, moment, $state, ngTableParams, principal, SweetAlert, $location, shareObjectService, EventServices){

        UserServices.get({action:'me'}).$promise.then(function (value){
            if ($rootScope.isAdmin(value)) {
                $scope.admin= true;
                        };
            });
            
       
        $scope.moment = moment;



        $scope.event = EventServices.getOne({action:$state.params.id});

         $scope.unbook= function(event){
             SweetAlert.swal({
                title: "Are you sure?",
                text: "You're about to unbook from this event!",
                type: "warning",
                showCancelButton: true,
                // confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, unbook me!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    EventServices.remove({action:event.id, type:'booking'}).$promise.then(function(){
                        SweetAlert.swal("Unbooked!", "Booking has been cancelled.", "success");
                    }, function(error){
                        if(error.status == 409) SweetAlert.swal("Info", "You are not booked!", "info");
                        else  SweetAlert.swal("Error", "No action was taken", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelled", "No action was taken", "error");
                }
            });
        }
          
$scope.bookingEvent = function(event){
            SweetAlert.swal({
                title: "Are you sure?",
                text: "You're going to partecipate the event!",
                type: "warning",
                showCancelButton: true,
                // confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, book it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    EventServices.save({action:event.id, type:'booking'}).$promise.then(function(){
                        SweetAlert.swal("Reserved!", "Event has been reserved.", "success");
                    }, function(error){
                        if(error.status == 409) SweetAlert.swal("Info", "You are alredy reserved!", "info");
                        else  SweetAlert.swal("Error", "No action was taken", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelled", "No action was taken", "error");
                }
            });
        };


    }]);


app.controller('CalendarCtrl', ["$scope", "$aside", "moment", "SweetAlert", "EventServices", "shareObjectService", "$state",
    function ($scope, $aside, moment, SweetAlert, EventServices, shareObjectService, $state) {

  
var vm = this;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    //start of last month
    var startLastMonth = moment().subtract(1, 'month').startOf('month').format('YYYY/MM/DD');
    EventServices.get({action:'timeline', d1:startLastMonth, size:30}).$promise.then(function(result){
        if(angular.isDefined(result._embedded)) $scope.events = result._embedded.eventList;
        for(var i=0; i<$scope.events.length; i++){
            // $scope.events[i].startDateMonth = moment($scope.events[i].startDate).format('MMMM YYYY');
            $scope.events[i] = {
                title:  $scope.events[i].name,
                type: 'job',
                startsAt:  new Date($scope.events[i].startDate),
                endsAt: new Date($scope.events[i].endDate),
                text: $scope.events[i].text,
                imageId: $scope.events[i].imageId,
                id: $scope.events[i].id,
                booked: $scope.events[i].booked,
                today: date
                
            };
        }
    });

    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();

    function showModal(action, event) {
        var modalInstance = $aside.open({
            templateUrl: 'calendarEvent.html',
            placement: 'right',
            size: 'sm',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                $scope.$modalInstance = $uibModalInstance;
                $scope.action = action;
                $scope.event = event;
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.deleteEvent = function () {
                    $uibModalInstance.close($scope.event, $scope.event);
                };
                

            }
        });
        modalInstance.result.then(function (selectedEvent, action) {

            $scope.bookingEvent(selectedEvent);

        });
    }


    $scope.eventClicked = function (event) {
        showModal('Clicked', event);
    };
    $scope.addEvent = function () {
        $scope.events.push({
            title: 'New Event',
            startsAt: new Date(y, m, d, 10, 0),
            endsAt: new Date(y, m, d, 11, 0),
            type: 'job'
        });
        $scope.eventEdited($scope.events[$scope.events.length - 1]);
    };

    $scope.eventEdited = function (event) {
        showModal('Edited', event);
    };


     $scope.unbook= function(event){
             SweetAlert.swal({
                title: "Are you sure?",
                text: "You're about to unbook from this event!",
                type: "warning",
                showCancelButton: true,
                // confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, unbook me!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    EventServices.remove({action:event.id, type:'booking'}).$promise.then(function(){
                        SweetAlert.swal("Unbooked!", "Booking has been cancelled.", "success");
                    }, function(error){
                        if(error.status == 409) SweetAlert.swal("Info", "You are not booked!", "info");
                        else  SweetAlert.swal("Error", "No action was taken", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelled", "No action was taken", "error");
                }
            });
        }


    $scope.bookingEvent = function (event) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "You're going to partecipate the event!",
            type: "warning",
            showCancelButton: true,
            // confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, book it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                EventServices.save({action:event.id, type:'booking'}).$promise.then(function(){
                    SweetAlert.swal("Reserved!", "Event has been reserved.", "success");
                }, function(error){
                    if(error.status == 409) SweetAlert.swal("Info", "You are alredy reserved!", "info");
                    else  SweetAlert.swal("Error", "No action was taken", "error");
                });
            } else {
                SweetAlert.swal("Cancelled", "No action was taken", "error");
            }
        });
    };


    $scope.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();

        event[field] = !event[field];
    };

 $scope.goDetail = function (event){
                
                $state.go('app.auth.event.detail', {id:event.id});
    }


}]);

app.controller('EventNewCtrl', ["$scope", "$rootScope", "$aside", "$state", "$cookieStore", "FileUploader", "moment", "SweetAlert", "EventServices", 
    function ($scope, $rootScope, $aside, $state, $cookieStore, FileUploader, moment, SweetAlert, EventServices) {

        $scope.uploader = new FileUploader({
            url: $rootScope.restPath + '/api/attach/image',
             headers : {
                'Authorization': 'Bearer ' + $cookieStore.get('identity').access_token,
                'Accept': 'application/json, text/plain, */*'
            },
            method: 'POST',
            autoUpload: false
        });

        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function (item/*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        $scope.uploader.onCompleteItem = function(value, response, status, header) {
            if(status == 200) $scope.event.imageId = response.id;
        };

        $scope.saveEvent = function(){
            EventServices.save($scope.event).$promise.then(function(){
                SweetAlert.swal("Success!", "New Event is Saved!", "success");
                $state.go('app.auth.event.timeline');
            }, function(error){
                SweetAlert.swal("Ops something get error!", "Reload page and try again!", "error");
            });
        }



 //DATATIMEPICKER START
    $scope.clear = function () {
        $scope.dt = null;
    };
    
    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    };
    $scope.endOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startOpened = false;
        $scope.endOpened = !$scope.endOpened;
    };
    $scope.startOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endOpened = false;
        $scope.startOpened = !$scope.startOpened;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.format = 'dd.MM.yyyy';
    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.dt);
    };
    //DATATIMEPICKER END

    }]);


