'use strict';

var _config = {
    contextPath: '/kidscare', // "http://localhost:8080/kidscare"
    service: {
        offline: true,
        proxy: {
            enabled: true,
            path: 'proxy', // "http://localhost:8080/kidscare/proxy"
        },
        metadata: {
            online: {
                url: 'http://10.58.185.121:8000/sap/tam/demo/supplydemand/rest',
                username: 'SYSTEM',
                password: 'Abcd1234'
            },
            offline: {
                url: 'data'
            }
        },
        api: {
            'sample': {
                online: {
                    path: 'odata.xsodata/EquipmentCategories',
                    type: 'odata'
                },
                offline: {
                    path: 'sample.json',
                    type: 'json'
                }
            }
        }
    },
    map: {
        location: {
            lat: 43.2964,
            lng: 5.37
        },
        zoom: 5
    }
};

app.constant('config', _config);

// Configuring $translateProvider
app.config(['$translateProvider', 'config', function($translateProvider, config) {
    var i18nPath = config.contextPath + '/i18n';

    // configures staticFilesLoader
    $translateProvider.useStaticFilesLoader({
        prefix: i18nPath + '/locale-',
        suffix: '.json'
    });

    // load 'en' table on startup
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    //$translateProvider.useLocalStorage();
}]);