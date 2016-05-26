module.exports = {
    standardversion: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts', dest: "standardversion/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts', dest: "standardversion/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/themify-icons/fonts', dest: "standardversion/assets/css/fonts"},

            {expand: true, src: "modernizr.js", cwd: 'bower_components/components-modernizr', dest: "standardversion/bower_components/components-modernizr"},
            {expand: true, src: "moment.min.js", cwd: 'bower_components/moment/min', dest: "standardversion/bower_components/moment/min"},
            {expand: true, src: "spin.js", cwd: 'bower_components/spin.js', dest: "standardversion/bower_components/spin.js"},
            {expand: true, src: "perfect-scrollbar.jquery.min.js", cwd: 'bower_components/perfect-scrollbar/js/min', dest: "standardversion/bower_components/perfect-scrollbar/js/min"},

            {expand: true, src: "ladda.min.js", cwd: 'bower_components/ladda/dist', dest: "standardversion/bower_components/ladda/dist"},
            {expand: true, src: "sweet-alert.min.js", cwd: 'bower_components/sweetalert/lib', dest: "standardversion/bower_components/sweetalert/lib"},
            {expand: true, src: "Chart.min.js", cwd: 'bower_components/chartjs', dest: "standardversion/bower_components/chartjs"},
            {expand: true, src: "jquery.sparkline.min.js", cwd: 'bower_components/jquery.sparkline.build/dist', dest: "standardversion/bower_components/jquery.sparkline.build/dist"},
            {expand: true, src: "ckeditor.js", cwd: 'bower_components/ckeditor', dest: "standardversion/bower_components/ckeditor"},
            {expand: true, src: "jquery.nestable.js", cwd: 'bower_components/jquery-nestable', dest: "standardversion/bower_components/jquery-nestable"},
            {expand: true, src: "jquery.bootstrap-touchspin.min.js", cwd: 'bower_components/bootstrap-touchspin/dist', dest: "standardversion/bower_components/bootstrap-touchspin/dist"},
            {expand: true, src: "angular-moment.min.js", cwd: 'bower_components/angular-moment', dest: "standardversion/bower_components/angular-moment"},
            {expand: true, src: "toaster.js", cwd: 'bower_components/AngularJS-Toaster', dest: "standardversion/bower_components/AngularJS-Toaster"},
            {expand: true, src: "angular-ladda.min.js", cwd: 'bower_components/angular-ladda/dist', dest: "standardversion/bower_components/angular-ladda/dist"},
            {expand: true, src: "ng-table.min.js", cwd: 'bower_components/ng-table/dist', dest: "standardversion/bower_components/ng-table/dist"},
            {expand: true, src: "ng-img-crop.js", cwd: 'bower_components/ngImgCrop/compile/minified', dest: "standardversion/bower_components/ngImgCrop/compile/minified"},
            {expand: true, src: "angular-file-upload.min.js", cwd: 'bower_components/angular-file-upload', dest: "standardversion/bower_components/angular-file-upload"},
            {expand: true, src: "angular-aside.min.js", cwd: 'bower_components/angular-aside/dist/js', dest: "standardversion/bower_components/angular-aside/dist/js"},
            {expand: true, src: "truncate.js", cwd: 'bower_components/angular-truncate/src', dest: "standardversion/bower_components/angular-truncate/src"},
            {expand: true, src: "SweetAlert.min.js", cwd: 'bower_components/angular-sweetalert-promised', dest: "standardversion/bower_components/angular-sweetalert-promised"},
            {expand: true, src: "ng-map.min.js", cwd: 'bower_components/ngmap/build/scripts', dest: "standardversion/bower_components/ngmap/build/scripts"},
            {expand: true, src: "tc-angular-chartjs.min.js", cwd: 'bower_components/tc-angular-chartjs/dist', dest: "standardversion/bower_components/tc-angular-chartjs/dist"},
            {expand: true, src: "ng-flow-standalone.min.js", cwd: 'bower_components/ng-flow/dist', dest: "standardversion/bower_components/ng-flow/dist"},
            {expand: true, src: "angular-ui-switch.min.js", cwd: 'bower_components/angular-ui-switch', dest: "standardversion/bower_components/angular-ui-switch"},
            {expand: true, src: "angular-ckeditor.min.js", cwd: 'bower_components/angular-ckeditor', dest: "standardversion/bower_components/angular-ckeditor"},
            {expand: true, src: "v-accordion.min.js", cwd: 'bower_components/v-accordion/dist', dest: "standardversion/bower_components/v-accordion/dist"},
            {expand: true, src: "xeditable.min.js", cwd: 'bower_components/angular-xeditable/dist/js', dest: "standardversion/bower_components/angular-xeditable/dist/js"},
            {expand: true, src: "checklist-model.js", cwd: 'bower_components/checklist-model', dest: "standardversion/bower_components/checklist-model"},
            {expand: true, src: "angular-notification-icons.min.js", cwd: 'bower_components/angular-notification-icons/dist', dest: 'standardversion/bower_components/angular-notification-icons/dist'},
            {expand: true, src: "angular-bootstrap-calendar-tpls.js", cwd: 'bower_components/angular-bootstrap-calendar/dist/js', dest: 'standardversion/bower_components/angular-bootstrap-calendar/dist/js'},



            {expand: true, src: "perfect-scrollbar.min.css", cwd: 'bower_components/perfect-scrollbar/css', dest: "standardversion/bower_components/perfect-scrollbar/css"},
            {expand: true, src: "ladda-themeless.min.css", cwd: 'bower_components/ladda/dist', dest: "standardversion/bower_components/ladda/dist"},
            {expand: true, src: "sweet-alert.css", cwd: 'bower_components/sweetalert/lib', dest: "standardversion/bower_components/sweetalert/lib"},
            {expand: true, src: "jquery.bootstrap-touchspin.min.css", cwd: 'bower_components/bootstrap-touchspin/dist', dest: "standardversion/bower_components/bootstrap-touchspin/dist"},
            {expand: true, src: "toaster.css", cwd: 'bower_components/AngularJS-Toaster', dest: "standardversion/bower_components/AngularJS-Toaster"},
            {expand: true, src: "abn_tree.css", cwd: 'bower_components/angular-bootstrap-nav-tree/dist', dest: "standardversion/bower_components/angular-bootstrap-nav-tree/dist"},
            {expand: true, src: "ng-table.min.css", cwd: 'bower_components/ng-table/dist', dest: "standardversion/bower_components/ng-table/dist"},
            {expand: true, src: "select.min.css", cwd: 'bower_components/angular-ui-select/dist', dest: "standardversion/bower_components/angular-ui-select/dist"},
            {expand: true, src: "select2.min.css", cwd: 'bower_components/select2/dist/css', dest: "standardversion/bower_components/select2/dist/css"},
            {expand: true, src: "select2-bootstrap.min.css", cwd: 'bower_components/select2-bootstrap-css', dest: "standardversion/bower_components/select2-bootstrap-css"},
            {expand: true, src: "selectize.bootstrap3.css", cwd: 'bower_components/selectize/dist/css', dest: "standardversion/bower_components/selectize/dist/css"},
            {expand: true, src: "ng-img-crop.css", cwd: 'bower_components/ngImgCrop/compile/minified', dest: "standardversion/bower_components/ngImgCrop/compile/minified"},
            {expand: true, src: "angular-aside.min.css", cwd: 'bower_components/angular-aside/dist/css', dest: "standardversion/bower_components/angular-aside/dist/css"},
            {expand: true, src: "angular-ui-switch.min.css", cwd: 'bower_components/angular-ui-switch', dest: "standardversion/bower_components/angular-ui-switch"},
            {expand: true, src: "v-accordion.min.css", cwd: 'bower_components/v-accordion/dist', dest: "standardversion/bower_components/v-accordion/dist"},
            {expand: true, src: "xeditable.css", cwd: 'bower_components/angular-xeditable/dist/css', dest: "standardversion/bower_components/angular-xeditable/dist/css"},
            {expand: true, src: "angular-notification-icons.min.css", cwd: 'bower_components/angular-notification-icons/dist', dest: "standardversion/bower_components/angular-notification-icons/dist"},
            {expand: true, src: "angular-bootstrap-calendar.min.css", cwd: 'bower_components/angular-bootstrap-calendar/dist/css', dest: "standardversion/bower_components/angular-bootstrap-calendar/dist/css"},
            
            

            {expand: true, src: "**", cwd: 'STANDARD/templates',     dest: "standardversion/templates"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/api',     dest: "standardversion/assets/api"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/i18n',    dest: "standardversion/assets/i18n"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/images',     dest: "standardversion/assets/images"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/js/config',      dest: "standardversion/assets/js/config"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/js/directives',      dest: "standardversion/assets/js/directives"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/js/controllers',      dest: "standardversion/assets/js/controllers"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/js/filters',      dest: "standardversion/assets/js/filters"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/js/services',      dest: "standardversion/assets/js/services"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/views',     dest: "standardversion/assets/views"},
            {expand: true, src: "**", cwd: 'STANDARD/assets/css/themes',     dest: "standardversion/assets/css/themes"},
            {src: 'STANDARD/master/_index.min.html', dest : 'standardversion/index.html'}
        ]
    },
    rtlversion: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts', dest: "rtlversion/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts', dest: "rtlversion/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/themify-icons/fonts', dest: "rtlversion/assets/css/fonts"},
            {expand: true, src: "**", cwd: 'RTL/templates',     dest: "rtlversion/templates"},
            {expand: true, src: "**", cwd: 'RTL/assets/api',     dest: "rtlversion/assets/api"},
            {expand: true, src: "**", cwd: 'RTL/assets/i18n',    dest: "rtlversion/assets/i18n"},
            {expand: true, src: "**", cwd: 'RTL/assets/images',     dest: "rtlversion/assets/images"},
            {expand: true, src: "**", cwd: 'RTL/assets/js/config',      dest: "rtlversion/assets/js/config"},
            {expand: true, src: "**", cwd: 'RTL/assets/js/directives',      dest: "rtlversion/assets/js/directives"},
            {expand: true, src: "**", cwd: 'RTL/assets/js/controllers',      dest: "rtlversion/assets/js/controllers"},
            {expand: true, src: "**", cwd: 'RTL/assets/js/filters',      dest: "rtlversion/assets/js/filters"},
            {expand: true, src: "**", cwd: 'RTL/assets/views',     dest: "rtlversion/assets/views"},
            {expand: true, src: "**", cwd: 'RTL/assets/css/themes',     dest: "rtlversion/assets/css/themes"},
            {src: 'RTL/master/_index.min.html', dest : 'rtlversion/index.html'},
            {src: 'RTL/upload.php', dest : 'rtlversion/upload.php'}
        ]
    }

};
