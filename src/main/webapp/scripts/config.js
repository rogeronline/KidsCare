'use strict';

var app = angular.module('app');

function getContextPath() {
    var contextPath = '/' + window.location.pathname.split('/')[1]; // "/demo"
    return contextPath;
}

var _config = {
    contextPath: '/kidscare', // "http://localhost:8080/kidscare"
    service: {
        offline: true,
        proxy: {
            enabled: true,
            path: 'proxy' // "http://localhost:8080/demo/proxy"
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
            'items': {
                online: {
                    path: 'odata.xsodata/Items',
                    type: 'odata'
                },
                offline: {
                    path: 'items.json',
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


// Configuring $routeProvider
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/diet', {
            templateUrl: 'views/diet.html',
            controller: 'DietCtrl'
        })
        .when('/growth', {
            templateUrl: 'views/growth.html',
            controller: 'GrowthCtrl'
        })
        .when('/intelligence', {
            templateUrl: 'views/intelligence.html',
            controller: 'IntelligenceCtrl'
        })
        .when('/disease', {
            templateUrl: 'views/disease.html',
            controller: 'DiseaseCtrl'
        })
        .when('/record', {
            templateUrl: 'views/record.html',
            controller: 'RecordCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);


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