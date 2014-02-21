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
    // Form
    //--------------------------------------------------------------------------

    $scope.formData = {
        type: 'formula',
        sort: '0',
        order: 1,
        top: 9
    };

    $scope.sortKeywords = [
        {
            id: '0',
            name: 'All'
        },
        {
            id: '37',
            name: 'Easy to Digest'
        },
        {
            id: '52',
            name: 'Good Taste'
        },
        {
            id: '43',
            name: 'Less Internal Heat'
        }
    ];

    function changeKeyword(keyword) {
        $scope.formData.sort = keyword.id;

        refreshBrands();
        refreshPosts();
    }

    $scope.changeKeyword = changeKeyword;

    //--------------------------------------------------------------------------
    // Brand
    //--------------------------------------------------------------------------

    function updateBrands() {
        var formData = $scope.formData;

        var params = {
            type: formData.type || 'formula',
            sort: formData.sort || null,
            order: formData.order || 1,
            top: formData.top || 5
        };
        dataService.getBrands(params, function(data) {
            $scope.brands = data.results || [];
        });
    }

    function refreshBrands() {
        updateBrands();
    }

    $scope.refreshBrands = refreshBrands;

    function changeBrandOrder(order) {
        $scope.formData.order = order;
        refreshBrands();
    }

    $scope.changeBrandOrder = changeBrandOrder;

    function showBrand(brand) {
        var params = {
            id: brand.id
        };
        dataService.getBrand(params, function(data) {
            channel.publish('brand_detail_loaded', data);
        });
    }

    $scope.showBrand = showBrand;


    //--------------------------------------------------------------------------
    // Post
    //--------------------------------------------------------------------------

    function updatePosts() {
        var formData = $scope.formData;

        var params = {
            type: formData.type || 'formula',
            sort: formData.sort || null,
            top: formData.top || 5
        };
        dataService.getPosts(params, function(data) {
            $scope.posts = data.results || [];
        });
    }

    function refreshPosts() {
        updatePosts();
    }

    $scope.refreshPosts = refreshPosts;

    function showMorePosts() {
        var formData = $scope.formData;

        var params = {
            type: formData.type || 'formula',
            sort: formData.sort || null,
            top: formData.top || 5,
            skip: $scope.posts.length
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