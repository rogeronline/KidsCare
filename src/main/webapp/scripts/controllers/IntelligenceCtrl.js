'use strict';

app.controller('IntelligenceCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $scope.navItems = [
        {
            id: 'all',
            name: 'All'
        },
        {
            id: 'toyCategory',
            name: 'Toy Category'
        },
        {
            id: 'toyFeatrues',
            name: 'Toy Features'
        },
        {
            id: 'toyBrands',
            name: 'Toy Brands'
        }
    ];
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