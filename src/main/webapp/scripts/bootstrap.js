'use strict';

(function($LAB) {
    var exports = window;

    function bootstrap(options) {
        options = options || {};

        $LAB.setGlobalDefaults({
            'BasePath': options.basePath || '',
            'Debug': true
        });

        $LAB
            .queueScript('scripts/console.js')
            .queueScript([
                'bower_components/jquery/dist/jquery.js',
                'bower_components/angular/angular.js',
                'bower_components/underscore/underscore.js'
            ]).queueWait()
            .queueScript(function() {
                var locale = navigator.language.toLowerCase();
                var url = 'bower_components/angular-i18n/angular-locale_' + locale + '.js';
                return url;
            })
            .queueScript([
                'bower_components/angular-route/angular-route.js'
            ])
            .queueScript([
                'bower_components/angular-translate/angular-translate.js',
                'bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
                'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
                'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                'bower_components/angular-translate-storage-local/angular-translate-storage-local.js'
            ])
            .queueScript([
                'bower_components/jquery-ui/ui/jquery-ui.js',
                'bower_components/bootstrap/dist/js/bootstrap.js',
                'bower_components/angular-ui/build/angular-ui.js',
                'bower_components/angular-ui-utils/ui-utils.js',
                'bower_components/angular-ui-bootstrap/dist/ui-bootstrap-tpls-0.10.0.js',
                'bower_components/datajs/datajs-1.1.1.js',
                'bower_components/select2/select2.js',
                'bower_components/angular-ui-select2/src/select2.js',
                'bower_components/raphael/raphael.js',
                'bower_components/jquery.transit/jquery.transit.js',
                'vendor/widgets/prettyCheckable.min.js'
            ]).queueWait()
            .queueScript('scripts/app.js').queueWait()
            .queueScript('scripts/config.js').queueWait()
            .queueScript([
                //'scripts/directives/directives.js'
            ])
            .queueScript([
                'scripts/filters/filters.js'
            ])
            .queueScript([
                'scripts/services/channel.js',
                'scripts/services/dataStorage.js',
                'scripts/services/dataService.js'
            ])
            .queueScript([
                'scripts/controllers/debugboxCtrl.js'
            ]);
    }

    exports.bootstrap = bootstrap;
})($LAB);
