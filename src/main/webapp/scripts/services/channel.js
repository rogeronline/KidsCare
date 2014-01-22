'use strict';

app.factory('channel', [function() {

    var exports;

    var channels = {};

    exports = {
        subscribe: function(topic, callback) {
            if (!_.isArray(channels[topic])) {
                channels[topic] = [];
            }

            var handlers = channels[topic];
            handlers.push(callback);
        },
        unsubscribe: function(topic, callback) {
            if (_.isArray(channels[topic])) {
                var handlers = channels[topic];

                var index = _.indexOf(handlers, callback);
                if (index >= 0) {
                    handlers.splice(index, 1);
                }
            }
        },
        publish: function(topic, data) {
            var self = this;

            var handlers = channels[topic] || [];
            _.each(handlers, function(handler) {
                handler.apply(self, [data]);
            });
        }
    };

    return exports;
}]);
