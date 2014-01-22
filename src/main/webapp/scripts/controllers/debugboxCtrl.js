'use strict';

app.controller('debugboxCtrl', ['$scope', 'channel',
function($scope, channel) {

    $scope.msgbox = {
        title: 'Debug Box',
        message: 'hello world',
        level: 'alert-info'
    };

    //--------------------------------------------------------------------------
    // subscribe
    //--------------------------------------------------------------------------

    channel.subscribe('debugbox_open', function(data) {
        $scope.msgbox = _.defaults(data, $scope.msgbox);

        jQuery('#debugbox').modal('show');
    });

    channel.subscribe('debugbox_close', function(data) {
        jQuery('#debugbox').modal('hide');
    });
}]);
