'use strict';

app.controller('TopicDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $('#top_topic').on('shown.bs.modal', function (e) {
        drawGoodKeyGraph();
        drawBadKeyGraph();
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