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
                'webjars/jquery/2.1.0/jquery.js',
                'webjars/angularjs/1.2.13/angular.js',
                'webjars/underscorejs/1.5.2/underscore.js'
            ]).queueWait()
            .queueScript(function() {
                var locale = navigator.language.toLowerCase();
                var url = 'webjars/angularjs/1.2.13/i18n/angular-locale_' + locale + '.js';
                return url;
            })
            .queueScript([
                'webjars/angularjs/1.2.13/angular-route.js'
            ])
            .queueScript([
                'webjars/angular-translate/1.1.1/angular-translate.js',
                'webjars/angular-translate-interpolation-messageformat/0.1.2/angular-translate-interpolation-messageformat.js',
                'webjars/angular-translate-loader-static-files/0.1.6/angular-translate-loader-static-files.js',
                'webjars/angular-translate-loader-url/0.1.2/angular-translate-loader-url.js',
                'webjars/angular-translate-storage-cookie/0.1.3/angular-translate-storage-cookie.js',
                'webjars/angular-translate-storage-local/0.1.3/angular-translate-storage-local.js'
            ])
            .queueScript([
                'webjars/jquery-ui/1.10.3/ui/jquery-ui.js',
                'webjars/bootstrap/3.1.1/js/bootstrap.js',
                'webjars/angular-ui/0.4.0/angular-ui.js',
                'webjars/angular-ui-utils/0.1.0/ui-utils.js',
                'webjars/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.js',
                'vendor/datajs/datajs-1.1.1.js',
                'webjars/select2/3.4.5/select2.js',
                'webjars/ui-select2/0.0.5/ui-select2.js',
                'webjars/raphaeljs/2.1.2/raphael.js',
                'webjars/jquery-transit/0.9.9/jquery.transit.js',
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
