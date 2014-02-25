'use strict';

app.controller('MedicalDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    channel.subscribe('medical_topic_selected', function(data) {
        //data.sol_key = data.sol_key.split(" ").join(", ");
        $scope.topic = data;
    });

    channel.subscribe('medical_topic_detail', function(data) {
        $scope.topicDetail = data;
        jQuery('#medical_topic').modal('show');
    });

    $('#medical_topic').on('shown.bs.modal', function (e) {

    });

    $('.medical-dismiss').on('click', function() {
        $('#medical_topic').modal('hide');
    });

    $('.medical-praise').on('click', function() {
        $('.praise-info').css('display', 'block');
        $('.praise-info').fadeOut(2000, function() {
            $('.praise-info').css('display', 'none');
        });
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