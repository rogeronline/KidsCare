'use strict';

app.controller('DiseaseCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {
    $scope.selectImg = function(img){
        alert(img.keywords);
    };
    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
        $scope.imgs1 = [
                        {src:"images/illness1.png",
                        keywords: "红点 不痒  背上"},
                        {src:"images/illness2.png",
                        keywords: "过敏  红疙瘩 密密麻麻"}];
        $scope.imgs2 = [
                        {src:"images/illness3.png",
                        keywords: "满身 发烧 "},
                        {src:"images/illness4.png",
                        keywords: "起皮  粗糙  脸颊 "},
                        {src:"images/illness5.png",
                        keywords: "红点  高烧"},
                        {src:"images/illness3.png",
                        keywords: "满身 发烧 "},
                        {src:"images/illness3.png",
                        keywords: "满身 发烧 "},
                        {src:"images/illness3.png",
                        keywords: "满身 发烧 "}
        ];
        $scope.topics = [{
            title: "how to solve...",
            keyWords: "how to solve...",
            type: "images/leaf1.png"
        },
        {
            title: "how to solve...",
            keyWords: "how to solve...",
            type: "images/leaf1.png"
        },
        {
            title: "how to solve...",
            keyWords: "how to solve...",
            type: "images/leaf1.png"
        },
        {
            title: "how to solve...",
            keyWords: "how to solve...",
            type: "images/leaf1.png"
        },
        {
            title: "how to solve...",
            keyWords: "how to solve...",
            type: "images/leaf1.png"
        }];
    }

    init();
    refresh();
}]);