'use strict';

app.controller('QuestionnaireCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {
    $scope.nextClick = function(){
        $('input:radio[name="questionAnswer"]').attr('checked', false);
        if($scope.number == 1) {
            $scope.number = 2;
            $scope.question = 'Does baby have a fever?';
            $($(".question")[0]).removeClass("questionBrand").removeClass("questionBrand1");
            $($(".question")[1]).addClass("questionBrand").addClass("questionBrand2");
            return;
        }
        if($scope.number == 2) {
            $scope.number = 3;
            $scope.question = 'Does the baby feed by formula?';
            $($(".question")[1]).removeClass("questionBrand").removeClass("questionBrand2");
            $($(".question")[2]).addClass("questionBrand").addClass("questionBrand3");
            return;
        }
        if($scope.number = 3){
            $scope.number = 1;
            $($(".question")[2]).removeClass("questionBrand").removeClass("questionBrand3");
            $($(".question")[0]).addClass("questionBrand").addClass("questionBrand1");
            $('#closeUpload').click();
            $('#questionnaire_detail').modal('hide');
            $('.navbar-nav li a')[4].click();
            return;
            //close the popup and go to disease page.
        }
    };

    $('.question-close').on('click', function() {
        $("#questionnaire_detail").modal('hide');
    });
    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
        $scope.number = 1;
        $scope.question = 'Are the red pots mainly on the head and face?';
    }

    init();
    refresh();
}]);