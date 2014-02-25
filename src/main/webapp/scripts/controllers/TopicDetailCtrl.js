'use strict';

app.controller('TopicDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    channel.subscribe('post_detail_loaded', function(data) {
        $scope.data = data;

        jQuery('#post_detail').modal('show');
    });

    $('#post_detail').on('shown.bs.modal', function (e) {
        var data = $scope.data;
        $scope.topic = data;

        /*$('#post_detail').transition({
            duration: 500,
            perspective: '1100px',
            rotate3d: '1,1,0,360deg'
        }, function(){
            //reset the transform property
            $(this).css('transform', '');
        });*/
        $('#post_detail').animate({
            x: '-1500px'
        }, 1000, 'linear', function() {
            $('#post_detail').css('transform', '');
            $('#post_detail').css('position', '')
                             .css('right', 0);
        });
    });

    $('.post-dismiss').on('click', function() {
        $('#post_detail').modal('hide');
        $('#post_detail').css('transform', '');
        $('#post_detail').css('position', '')
                         .css('right', "-3000px");
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