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
            enabled: false,
            path: 'proxy' // "http://localhost:8080/demo/proxy"
        },
        metadata: {
            online: {
                url: 'service'
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
            },
            'brands': {
                online: {
                    path: 'brands',
                    type: 'json'
                },
                offline: {
                    path: 'brands.json',
                    type: 'json'
                }
            },
            'brand': {
                online: {
                    path: 'brands/{id}',
                    type: 'json'
                },
                offline: {
                    path: 'brand.json',
                    type: 'json'
                }
            },
            'posts': {
                online: {
                    path: 'posts',
                    type: 'json'
                },
                offline: {
                    path: 'posts.json',
                    type: 'json'
                }
            },
            'post': {
                online: {
                    path: 'posts/{id}',
                    type: 'json'
                },
                offline: {
                    path: 'post.json',
                    type: 'json'
                }
            },
            'brandRelatedPosts': {
                online: {
                    path: 'odata.xsodata/brand',
                    type: 'odata'
                },
                offline: {
                    path: 'getRelatedPostsByBrand.json',
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
        .when('/food', {
            templateUrl: 'views/diet.html',
            controller: 'DietCtrl'
        })
        .when('/milestone', {
            templateUrl: 'views/growth.html',
            controller: 'GrowthCtrl'
        })
        .when('/play', {
            templateUrl: 'views/intelligence.html',
            controller: 'IntelligenceCtrl'
        })
        .when('/illness', {
            templateUrl: 'views/disease.html',
            controller: 'DiseaseCtrl'
        })
        .when('/diary', {
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