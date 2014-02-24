'use strict';

app.controller('QuestionnaireCtrl', ['$scope', '$location', 'dataStorage', 'channel', 'dataService',
function($scope, $location, dataStorage, channel, dataService) {

    $('input[name="questionAnswer"]').prettyCheckable({
        color: 'red'
    });

    $scope.nextClick = function(){
        if($($('input:radio[name="questionAnswer"]:checked')).length == 0) {
            return;
        } else {
            $('input:radio[name="questionAnswer"]').prettyCheckable('uncheck');
            if($scope.number == 1) {
                $scope.number = 2;
                $scope.question = 'Does baby have a fever?';
                $($(".question")[0]).removeClass("questionBrand").removeClass("questionBrand1");
                $($(".question")[1]).addClass("questionBrand").addClass("questionBrand2");
                $(".question-tube").css("background-image", "url('images/tube2.png')");
                return;
            }
            if($scope.number == 2) {
                $scope.number = 3;
                $scope.question = 'Does the baby feed by formula?';
                $($(".question")[1]).removeClass("questionBrand").removeClass("questionBrand2");
                $($(".question")[2]).addClass("questionBrand").addClass("questionBrand3");
                $(".question-tube").css("background-image", "url('images/tube3.png')");
                return;
            }
            if($scope.number = 3){
                $scope.number = 1;
                $($(".question")[2]).removeClass("questionBrand").removeClass("questionBrand3");
                $($(".question")[0]).addClass("questionBrand").addClass("questionBrand1");
                $(".question-tube").css("background-image", "url('images/tube1.png')");
                $('#closeUpload').click();
                $('#questionnaire_detail').modal('hide');

                $location.path('/illness');
                return;
                //close the popup and go to disease page.
            }
        }
    };

    $('.question-close').on('click', function() {
        $("#questionnaire_detail").modal('hide');
        $('input:radio[name="questionAnswer"]').prettyCheckable('uncheck');
        $(".question-tube").css("background-image", "url('images/tube1.png')");
        $scope.number = 1;
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