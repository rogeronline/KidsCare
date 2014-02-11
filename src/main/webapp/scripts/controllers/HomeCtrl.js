'use strict';

app.controller('HomeCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    function update() {
        console.log('update view');
    }

    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
        update();
    }

    init();
    refresh();
}]);