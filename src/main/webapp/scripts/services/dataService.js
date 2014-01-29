'use strict';

app.factory('dataService', ['$http', 'config', 'formatFilter', function($http, config, formatFilter) {

    var exports;

    function getServiceRootPath() {
        var mode = config.service.offline ? 'offline' : 'online';
        var serviceRootUrl = config.service.metadata[mode].url;

        if (mode === 'online') {
            if (config.service.proxy.enabled) {
                serviceRootUrl = getProxyUrl(serviceRootUrl);
            }
        }

        return serviceRootUrl;
    }

    function getProxyUrl(url) {
        var transformedUrl = url.replace('://', '/'); // "http://host:port/path" => "http/host:port/path"
        var proxyUrl = config.service.proxy.path + '/' + transformedUrl;

        return proxyUrl;
    }

    function getAPI(key) {
        var api = config.service.api[key];

        if (!api) {
            return null;
        }

        var mode = config.service.offline ? 'offline' : 'online';
        return api[mode];
    }

    function invokeService(serviceKey, options) {
        var result = null;

        var api = getAPI(serviceKey);
        if (api) {
            // url
            var serviceRootPath = getServiceRootPath();
            var servicePath = formatFilter(api.path, options.params);
            var serviceUrl = config.contextPath + '/' + serviceRootPath + '/' + servicePath;

            // type
            var serviceType = api.type;

            if (serviceType === 'odata') {
                var odataRequest = {
                    headers: {
                        'Accept': 'application/json'
                    }
                    //data: {}, // Payload of the request (in intermediate format)
                };

                if (config.service.metadata.online.username) {
                    odataRequest.user = config.service.metadata.online.username;
                    odataRequest.password = config.service.metadata.online.password;
                }

                odataRequest.requestUri = serviceUrl;
                odataRequest.method = options.method;

                result = OData.request(odataRequest, function(data) {
                    // workaround, make $scope refresh
                    $http.get('data/dummy.txt');

                    var callback = options.callback;
                    callback && callback(data);
                });
            }

            if (serviceType === 'json') {
                var httpConfig = {
                    url: serviceUrl,
                    method: options.method
                };

                if (httpConfig.method === 'GET' || httpConfig.method === 'DELETE') {
                    httpConfig.params = options.params;
                }

                if (httpConfig.method === 'POST' || httpConfig.method === 'PUT') {
                    httpConfig.data = options.params;
                }

                result = $http(httpConfig).success(function(data) {
                    var callback = options.callback;
                    callback && callback(data);
                });
            }

            if (serviceType === 'xml') {
                var httpConfig = {
                    url: serviceUrl,
                    method: options.method
                };

                if (httpConfig.method === 'GET' || httpConfig.method === 'DELETE') {
                    httpConfig.params = options.params;
                }

                if (httpConfig.method === 'POST' || httpConfig.method === 'PUT') {
                    httpConfig.data = options.params;
                }

                result = $http(httpConfig).success(function(xmlText) {
                    var xmlDoc = jQuery.parseXML(xmlText);
                    var $xml = jQuery(xmlDoc);

                    var callback = options.callback;
                    callback && callback($xml);
                });
            }
        }

        return result;
    }


    // =========================================================================
    // Service
    // =========================================================================

    function getItems(params, callback) {
        var serviceKey = 'items';
        var options = {
            method: 'GET',
            params: params,
            callback: callback
        };
        var result = invokeService(serviceKey, options);

        return result;
    }

    function createProcess(params, callback) {
        var serviceKey = 'create_process';
        var options = {
            method: 'POST',
            params: params,
            callback: callback
        };
        var result = invokeService(serviceKey, options);

        return result;
    }

    function updateProcess(params, callback) {
        var serviceKey = 'update_process';
        var options = {
            method: 'PUT',
            params: params,
            callback: callback
        };
        var result = invokeService(serviceKey, options);

        return result;
    }

    function deleteProcess(params, callback) {
        var serviceKey = 'delete_process';
        var options = {
            method: 'DELETE',
            params: params,
            callback: callback
        };
        var result = invokeService(serviceKey, options);

        return result;
    }

    function execute(params, callback) {
        var serviceKey = 'execute';
        var options = {
            method: 'POST',
            params: params,
            callback: callback
        };
        var result = invokeService(serviceKey, options);

        return result;
    }

    exports = {
        getItems: getItems
    };

    return exports;
}]);
