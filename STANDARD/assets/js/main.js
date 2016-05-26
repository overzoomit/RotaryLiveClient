var app = angular.module('clipApp', ['clip-two']);
app.run(['$rootScope', '$state', '$stateParams', '$location', 'REST_PATH', 'principal', 'authorization', 
function ($rootScope, $state, $stateParams, $location, REST_PATH, principal, authorization) {

    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    

   
    
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        // track the state the user wants to go to; authorization service needs this
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
        $rootScope.locationSearch = $location.search();
        // if the principal is resolved, do an authorization check immediately. otherwise,
        // it'll be done when the state it resolved.
        if (principal.isIdentityResolved()){
            authorization.authorize();
        } 
        
      });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        $rootScope.fromState = fromState;
        $rootScope.fromStateParams = fromParams;
        //restore all query string parameters back to $location.search
        $location.search($rootScope.locationSearch);
        //cfpLoadingBar.complete()
        
        
    });





    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: 'Rotary Live', // name of your project
        author: 'Stasbranger srl', // author's name or company name
        description: 'Angular Bootstrap Admin Template', // brief description
        version: '2.0', // current version
        year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
        isMobile: (function () {// true if the browser is a mobile device
            var check = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                check = true;
            };
            return check;
        })(),
        layout: {
            isNavbarFixed: true, //true if you want to initialize the template with fixed header
            isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
            isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
            isFooterFixed: false, // true if you want to initialize the template with fixed footer
            theme: 'theme-1', // indicate the theme chosen for your project
            logo: 'assets/images/logo_rotary.png', // relative path of the project logo
        }
    };

    $rootScope.restPath = REST_PATH;

    // funzione scritta da silvio per restituire una immagine di default quando l'uriCode non è disponibile
    $rootScope.getImage = function(uriCode, isBigImage){
        if(angular.isUndefined(uriCode) || uriCode == null){
            if(isBigImage) return "http://placehold.it/200x200";
            else return "http://placehold.it/100x100";
        }else{
            if(isBigImage) return $rootScope.restPath + '/attach/image/' + uriCode;
            else return $rootScope.restPath + '/attach/thumbnail/' + uriCode;
        }
    }

}]);
// translate config
app.config(['$translateProvider',
function ($translateProvider) {

    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
    });

    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
    // This is where preferredLanguage(langKey) comes in.
    $translateProvider.preferredLanguage('en');

    // Store the language in the local storage
    $translateProvider.useLocalStorage();
    
    // Enable sanitize
    $translateProvider.useSanitizeValueStrategy('sanitize');

}]);
// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

}]);

app.config(function (HateoasInterceptorProvider) {
    HateoasInterceptorProvider.transformAllResponses();
});

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|sms|tel|mailto):/);
}]);