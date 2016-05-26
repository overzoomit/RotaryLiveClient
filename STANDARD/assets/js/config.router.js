'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/userlist
    $urlRouterProvider.otherwise("/app/user/list");
    //
    // Set up the states
    $stateProvider.state('app', {
        url: "/app",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl', 'truncate', 'htmlToPlaintext', 'angular-notification-icons','user', 'userCtrl'),
        abstract: true
    }).state('app.auth', {
        template: '<div ui-view class="fade-in-up"></div>',
        resolve: {
            authorize: ['authorization',
              function(authorization) {
                return authorization.authorize();
              }
            ],
        },
        data: {
          roles: ['Admin']
        },
        abstract: true

        //USER START
    }).state('app.auth.user', {
        url: '/user',
        templateUrl: "assets/views/user.html",
        title: 'User',
        ncyBreadcrumb: {
            label: 'User'
        },
        abstract: true
    }).state('app.auth.user.list', {
        url: "/list",
        templateUrl: "assets/views/userList.html",
        resolve: loadSequence('jquery-sparkline', 'ngTable', 'shareObjectService', 'user', 'userCtrl'),
        title: 'User List',
        ncyBreadcrumb: {
            label: 'User List'
        }
     }).state('app.auth.user.listme', {
        url: "/listme",
        templateUrl: "assets/views/userListMe.html",
        resolve: loadSequence('jquery-sparkline', 'ngTable', 'shareObjectService', 'user', 'userCtrl'),
        title: 'User List',
        ncyBreadcrumb: {
            label: 'User List'
        }
    }).state('app.auth.user.detail', {
        url: "/{id}/detail",
        templateUrl: "assets/views/userDetail.html",
        resolve: loadSequence('jquery-sparkline', 'shareObjectService', 'user', 'userCtrl'),
        title: 'User Detail',
        ncyBreadcrumb: {
            label: 'User Detail'
        }
    }).state('app.auth.user.chat', {
        url: "/{id}/chat",
        templateUrl: "assets/views/chat.html",
        resolve: loadSequence('jquery-sparkline', 'shareObjectService', 'user', 'userCtrl', 'chatCtrl'),
        title: 'Chat',
        ncyBreadcrumb: {
            label: 'Chat'
        }

    }).state('app.auth.user.modify', {
        url: "/{id}/modify",
        templateUrl: "assets/views/userEdit.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'ngImgCrop', 'angularFileUpload', 'jquery-sparkline', 'shareObjectService', 'user', 'club', 'userCtrl'),
        title: 'User Modify',
        ncyBreadcrumb: {
            label: 'User Modify'
        }
    }).state('app.auth.user.new', {
        url: "/new",
        templateUrl: "assets/views/userNew.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'ngImgCrop', 'angularFileUpload', 'jquery-sparkline', 'shareObjectService', 'user', 'club', 'userCtrl'),
        title: 'New User',
        ncyBreadcrumb: {
            label: 'New User'
        }
        //USER END


        //EVENT START
    }).state('app.auth.event', {
        url: '/event',
        templateUrl: "assets/views/event.html",
        title: 'Event',
        ncyBreadcrumb: {
            label: 'Event'
        },
        abstract: true
    }).state('app.auth.event.timeline', {
        url: "/timeline",
        templateUrl: "assets/views/eventTimeline.html",
        resolve: loadSequence('jquery-sparkline', 'ngTable', 'shareObjectService', 'event', 'eventCtrl'),
        title: 'Event List',
        ncyBreadcrumb: {
            label: 'Event List'
        }
    }).state('app.auth.event.detail', {
        url: "/{id}/detail",
        templateUrl: "assets/views/eventDetail.html",
        resolve: loadSequence('jquery-sparkline', 'ngTable', 'shareObjectService', 'event', 'eventCtrl'),
        title: 'Event Detail',
        ncyBreadcrumb: {
            label: 'Event Detail'
        }
    }).state('app.auth.event.calendar', {
        url: "/calendar",
        templateUrl: "assets/views/eventCalendar.html",
        resolve: loadSequence('jquery-sparkline', 'ngTable', 'moment', 'mwl.calendar', 'shareObjectService', 'event', 'eventCtrl'),
        title: 'User List',
        ncyBreadcrumb: {
            label: 'User List'
        }
    // }).state('app.auth.user.detail', {
    //     url: "/{id}/detail",
    //     templateUrl: "assets/views/userDetail.html",
    //     resolve: loadSequence('jquery-sparkline', 'shareObjectService', 'user', 'userCtrl'),
    //     title: 'User Detail',
    //     ncyBreadcrumb: {
    //         label: 'User Detail'
    //     }
    // }).state('app.auth.user.modify', {
    //     url: "/{id}/modify",
    //     templateUrl: "assets/views/userEdit.html",
    //     resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'ngImgCrop', 'angularFileUpload', 'jquery-sparkline', 'shareObjectService', 'user', 'club', 'userCtrl'),
    //     title: 'User Modify',
    //     ncyBreadcrumb: {
    //         label: 'User Modify'
    //     }
    }).state('app.auth.event.new', {
        url: "/new",
        templateUrl: "assets/views/eventNew.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'ngImgCrop', 'angularFileUpload', 'jquery-sparkline', 'shareObjectService', 'event', 'eventCtrl'),
        title: 'New Event',
        ncyBreadcrumb: {
            label: 'New Event'
        }
        //EVENT END



        //CLUB START
    }).state('app.auth.club', {
        url: '/club',
        templateUrl: "assets/views/club.html",
        title: 'Club',
        ncyBreadcrumb: {
            label: 'Club Name'
        },
        abstract: true
    }).state('app.auth.club.list', {
        url: "/list",
        templateUrl: "assets/views/clubList.html",
        resolve: loadSequence('jquery-sparkline', 'ngTable', 'shareObjectService', 'club', 'clubCtrl'),
        title: 'Club List',
        ncyBreadcrumb: {
            label: 'Club List'
        }
    }).state('app.auth.club.detail', {
        url: "/{id}/detail",
        templateUrl: "assets/views/clubDetail.html",
        resolve: loadSequence('jquery-sparkline', 'shareObjectService', 'club', 'clubCtrl'),
        title: 'User Detail',
        ncyBreadcrumb: {
            label: 'User Detail'
        }
    }).state('app.auth.club.modify', {
        url: "/{id}/modify",
        templateUrl: "assets/views/clubEdit.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'ngImgCrop', 'angularFileUpload', 'jquery-sparkline', 'shareObjectService', 'user', 'club', 'clubCtrl'),
        title: 'User Modify',
        ncyBreadcrumb: {
            label: 'User Modify'
        }
    }).state('app.auth.club.new', {
        url: "/new",
        templateUrl: "assets/views/clubNew.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'jquery-sparkline', 'shareObjectService', 'user', 'club', 'clubCtrl'),
        title: 'New User',
        ncyBreadcrumb: {
            label: 'New User'
        }
        //CLUB END

    }).state('error', {
        url: '/error',
        template: '<div ui-view class="fade-in-up"></div>'
    }).state('error.404', {
        url: '/404',
        templateUrl: "assets/views/utility_404.html",
    }).state('error.500', {
        url: '/500',
        templateUrl: "assets/views/utility_500.html",
    })

	// Login routes

	.state('login', {
	    url: '/login',
	    template: '<div ui-view class="fade-in-right-big smooth"></div>',
	    abstract: true
	}).state('login.signin', {
	    url: '/signin',
	    templateUrl: "assets/views/login_login.html",
        resolve: loadSequence('jquery-sparkline', 'user', 'loginCtrl'),
    }).state('login.signin.id', {
        url: '/{id}',
        templateUrl: "assets/views/login_login.html",
        resolve: loadSequence('jquery-sparkline', 'user', 'loginCtrl'),
	}).state('login.forgot', {
	    url: '/forgot_password',
	    templateUrl: "assets/views/login_forgot.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'user', 'signupCtrl'),
    }).state('login.reset', {
        url: '/reset_password/{code}',
        templateUrl: "assets/views/login_reset.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'user', 'signupCtrl'),
	}).state('login.registration', {
	    url: '/registration',
	    templateUrl: "assets/views/login_registration.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'user', 'club', 'signupCtrl'),
	}).state('login.lockscreen', {
	    url: '/lock',
	    templateUrl: "assets/views/login_lock_screen.html"
	});

    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);