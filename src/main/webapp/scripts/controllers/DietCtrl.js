'use strict';

app.controller('DietCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    //--------------------------------------------------------------------------
    // Navigation
    //--------------------------------------------------------------------------

    $scope.navItems = [
        {
            id: 'formula',
            name: 'Formulas'
        },
        {
            id: 'solid_food',
            name: 'Solid Foods'
        },
        {
            id: 'organic',
            name: 'Organic'
        },
        {
            id: 'nutrition',
            name: 'Nutrition'
        }
    ];

    //--------------------------------------------------------------------------
    // Brand
    //--------------------------------------------------------------------------

    function updateBrands(order) {
        var params = {
            type: 'formula',
            order: order || 1,
            top: 10
        };
        dataService.getBrands(params, function(data) {
            $scope.brands = data.results || [];
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
            $scope.posts = data.results || [];
        });
    }

    function showMorePosts() {
        var currentCount = $scope.posts.length;

        var params = {
            top: 10,
            skip: currentCount
        };

        dataService.getPosts(params, function(data) {
            var newPosts = data.results || [];
            jQuery.merge($scope.posts, newPosts);
        });
    }

    $scope.showMorePosts = showMorePosts;

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