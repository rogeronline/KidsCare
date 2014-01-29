'use strict';

app.controller('contentCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    function updateItems() {
        var params = {};
        dataService.getSample(params, function(data) {
            $scope.items = data.results;
        });
    }

    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
        updateItems();
    }

    init();
    refresh();
}]);