'use strict';

app.controller('RecordCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    function updateItems() {
        var params = {};
        dataService.getItems(params, function(data) {
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