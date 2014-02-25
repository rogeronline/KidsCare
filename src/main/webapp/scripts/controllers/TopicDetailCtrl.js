'use strict';

app.controller('TopicDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    channel.subscribe('post_detail_loaded', function(data) {
        $scope.data = data;

        jQuery('#post_detail').modal('show');
    });

    $('#post_detail').on('shown.bs.modal', function (e) {
        var data = $scope.data;
        $scope.topic = data;
    });

    $('.post-dismiss').on('click', function() {
        $('#post_detail').modal('hide');
    });

    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
    }

    init();
    refresh();
}]);