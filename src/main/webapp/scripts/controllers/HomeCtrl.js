'use strict';

app.controller('HomeCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $scope.$on('$viewContentLoaded', function() {
        var pic = $("#pic")[0];
        var picUrls = ["bg", "day-number", "tree", "tree-trunk"];
        var cursor = 0;
        pic.addEventListener("webkitAnimationEnd", function(event) {
            var bg = "url('images/" + picUrls[cursor++ % 4] + ".png') no-repeat";
            $(pic).css({
                "background": bg,
                "backgroundSize": "contain"
            });
            $(pic).removeClass("rotate").removeClass("normal");
            setTimeout(function() {
                $(pic).addClass("rotate").addClass("normal");
            }, 1);
        });
    });

    function update() {
        console.log('update view');
    }

    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
        update();
    }

    init();
    refresh();
}]);