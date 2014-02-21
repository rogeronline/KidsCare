'use strict';

app.controller('TopicDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $('#post_detail').on('shown.bs.modal', function (e) {
        var params = {};
        dataService.getPost(params, function(data) {
            $scope.topic = data;

            $('#post_detail').transition({
                duration: 500,
                perspective: '1100px',
                rotate3d: '1,1,0,360deg'
            }, function(){
                //reset the transform property
                $(this).css('transform', '');
            });

            /*dataService.getRelatedPostsByTopic(params, function(data) {
                $scope.posts = data.results;
                $('#post_detail').transition({
                    duration: 500,
                    perspective: '1100px',
                    rotate3d: '1,1,0,360deg'
                }, function(){
                    //reset the transform property
                    $(this).css('transform', '');
                });
            });*/
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