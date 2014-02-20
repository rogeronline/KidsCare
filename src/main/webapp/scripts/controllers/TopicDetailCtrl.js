'use strict';

app.controller('TopicDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $('#post_detail').on('shown.bs.modal', function (e) {
        //$('#post_detail').css('overflow-y', 'none');
        $('#post_detail').transition({
            duration: 1000,
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