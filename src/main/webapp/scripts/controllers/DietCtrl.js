'use strict';

app.controller('DietCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    //--------------------------------------------------------------------------
    // Brand
    //--------------------------------------------------------------------------

    function updateBrands(order) {
        var params = {
            type: 'milk',
            order: order || 1,
            top: 10
        };
        dataService.getBrands(params, function(data) {
            $scope.brands = _.times(params.top, function(i) {
                var item = {};
                var rank = i + 1;
                item.id = String.valueOf(rank);
                item.rank = rank;
                item.name = 'Brand ' + (params.order > 0 ? 'Most' : 'Least') + ' Liked ' + rank;
                return item;
            });
        });
    }

    function refreshBrands(order) {
        updateBrands(order);
    }

    $scope.refreshBrands = refreshBrands;

    function showBrand(brand) {
        jQuery('#milk_powder').modal('show');
    }

    $scope.showBrand = showBrand;


    //--------------------------------------------------------------------------
    // Post
    //--------------------------------------------------------------------------

    function updatePosts() {
        var params = {};
        dataService.getPosts(params, function(data) {
            $scope.posts = _.times(10, function(i) {
                var item = {};
                var rank = i + 1;
                item.id = String.valueOf(rank);
                item.rank = rank;
                item.title = 'Post ' + rank;
                return item;
            });
        });
    }

    function showPost(post) {
        jQuery('#post_detail').modal('show');
    }

    $scope.showPost = showPost;


    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
        updateBrands(1);
        updatePosts();
    }

    init();
    refresh();
}]);