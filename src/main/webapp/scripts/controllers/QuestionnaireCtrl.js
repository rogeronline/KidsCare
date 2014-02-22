'use strict';

app.controller('QuestionnaireCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {
    $scope.nextClick = function(){
        if($scope.number == 1) {
            $scope.number = 2;
            $scope.question = 'Does baby have a fever?';
            return;
        }
        if($scope.number == 2) {
            $scope.number = 3;
            $scope.question = 'Does  the baby feed by formula?';
            return;
        }
        if($scope.number = 3){
            $('#closeUpload').click();
            $('#questionnaire_detail').modal('hide');
            $('.navbar-nav li a')[4].click();
            return;
            //close the popup and go to disease page.
        }
    };
    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
        $scope.number = 1;
        $scope.question = 'Are the red pots  mainly on the head and face?';
    }

    init();
    refresh();
}]);