'use strict';

app.controller('DietCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    function showBrandDetail() {
        jQuery('#milk_powder').modal('show');
    }

    $scope.showBrandDetail = showBrandDetail;

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