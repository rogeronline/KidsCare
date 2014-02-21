'use strict';

app.controller('MedicalDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    channel.subscribe('medical_topic_loaded', function(data) {
        $scope.data = data;

        jQuery('#medical_topic').modal('show');
    });

    $('#medical_topic').on('shown.bs.modal', function (e) {
        var data = $scope.data;
        data.keywords = data.keywords.join(", ");
        $scope.topic = data;

        $('#medical_topic').transition({
            duration: 500,
            perspective: '1100px',
            rotate3d: '1,1,0,360deg'
        }, function(){
            //reset the transform property
            $(this).css('transform', '');
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