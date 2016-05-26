module.exports = {
	standardversion: {
		files: {
			'standardversion/assets/js/app.src.js': [
				'bower_components/jquery/dist/jquery.js', 
				'bower_components/fastclick/lib/fastclick.js', 
				'bower_components/angular/angular.js', 
				'bower_components/angular-cookies/angular-cookies.js', 
				'bower_components/angular-animate/angular-animate.js', 
				'bower_components/angular-touch/angular-touch.js', 
				'bower_components/angular-sanitize/angular-sanitize.js', 
				'bower_components/angular-ui-router/release/angular-ui-router.js', 
				'bower_components/ngstorage/ngStorage.js', 
				'bower_components/angular-translate/angular-translate.js', 
				'bower_components/angular-translate-loader-url/angular-translate-loader-url.js', 
				'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js', 
				'bower_components/angular-translate-storage-local/angular-translate-storage-local.js', 
				'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js', 
				'bower_components/oclazyload/dist/ocLazyLoad.js', 
				'bower_components/angular-breadcrumb/dist/angular-breadcrumb.js', 
				'bower_components/angular-bootstrap/ui-bootstrap-tpls.js', 
				'bower_components/angular-loading-bar/build/loading-bar.js', 
				'bower_components/angular-scroll/angular-scroll.js',

				'bower_components/ladda/dist/spin.min.js',
				'bower_components/ladda/dist/ladda.min.js',
				'bower_components/angular-truncate/src/truncate.js',
				'bower_components/angular-resource/angular-resource.min.js',
				'bower_components/angular-hateoas/src/angular-hateoas.js',
				'bower_components/angular-filter/dist/angular-filter.min.js',
				'bower_components/angular-moment/angular-moment.min.js',
				


				'STANDARD/assets/js/app.js', 
				'STANDARD/assets/js/main.js', 
				'STANDARD/assets/js/config.constant.js', 
				'STANDARD/assets/js/config.router.js',
				'STANDARD/assets/js/services/*.js',  
				'STANDARD/assets/js/directives/*.js', 
				'STANDARD/assets/js/filters/*.js', 
				'STANDARD/assets/js/controllers/mainCtrl.js', 
				'STANDARD/assets/js/controllers/inboxCtrl.js',
				'STANDARD/assets/js/controllers/bootstrapCtrl.js'
			],
			'standardversion/assets/css/app.css': [
				'bower_components/bootstrap/dist/css/bootstrap.css',
                'bower_components/font-awesome/css/font-awesome.css',
                'bower_components/themify-icons/themify-icons.css',
                'bower_components/angular-loading-bar/build/loading-bar.css',
                'bower_components/animate.css/animate.css',
                'STANDARD/assets/css/styles.css',
                'STANDARD/assets/css/plugins.css'
			],
		}
	},
	rtlversion: {
		files: {
			'rtlversion/assets/js/app.src.js': [
				'bower_components/jquery/dist/jquery.js', 
				'bower_components/fastclick/lib/fastclick.js', 
				'bower_components/angular/angular.js', 
				'bower_components/angular-cookies/angular-cookies.js', 
				'bower_components/angular-animate/angular-animate.js', 
				'bower_components/angular-touch/angular-touch.js', 
				'bower_components/angular-sanitize/angular-sanitize.js', 
				'bower_components/angular-ui-router/release/angular-ui-router.js', 
				'bower_components/ngstorage/ngStorage.js', 
				'bower_components/angular-translate/angular-translate.js', 
				'bower_components/angular-translate-loader-url/angular-translate-loader-url.js', 
				'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js', 
				'bower_components/angular-translate-storage-local/angular-translate-storage-local.js', 
				'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js', 
				'bower_components/oclazyload/dist/ocLazyLoad.js', 
				'bower_components/angular-breadcrumb/dist/angular-breadcrumb.js', 
				'bower_components/angular-bootstrap/ui-bootstrap-tpls.js', 
				'bower_components/angular-loading-bar/build/loading-bar.js', 
				'bower_components/angular-scroll/angular-scroll.js', 
				'RTL/assets/js/app.js', 'STANDARD/assets/js/main.js', 
				'RTL/assets/js/config.constant.js', 
				'RTL/assets/js/config.router.js', 
				'RTL/assets/js/directives/*.js', 
				'RTL/assets/js/filters/*.js', 
				'RTL/assets/js/controllers/mainCtrl.js',
				'RTL/assets/js/controllers/inboxCtrl.js',
				'RTL/assets/js/controllers/bootstrapCtrl.js'
			],
			'rtlversion/assets/css/app.css': [
				'bower_components/bootstrap/dist/css/bootstrap.css',
				'bower_components/bootstrap-rtl/dist/css/bootstrap-rtl.min.css',
                'bower_components/font-awesome/css/font-awesome.css',
                'bower_components/themify-icons/themify-icons.css',
                'bower_components/angular-loading-bar/build/loading-bar.css',
                'bower_components/animate.css/animate.css',
                'RTL/assets/css/styles.css',
                'RTL/assets/css/plugins.css',
                'RTL/assets/css/rtl.css',
			],
		}
	}
};
