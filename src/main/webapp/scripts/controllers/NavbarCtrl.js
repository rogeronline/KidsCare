'use strict';

app.controller('NavbarCtrl', ['$scope', '$location', 'dataStorage', 'channel', 'dataService',
function($scope, $location, dataStorage, channel, dataService) {

    $scope.isActive = function(viewLocation) { 
        return viewLocation === $location.path();
    };
}]);