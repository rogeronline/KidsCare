'use strict';

app.controller('HomeCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $scope.$on('$viewContentLoaded', function() {
        picAnimate();
        timeListEventsHandler();
    });

    function picAnimate() {
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
    }

    function timeListEventsHandler() {
        mousewheelHandler();
    }

    function mousewheelHandler() {
        var wrapHeight = $("#timeAxis").height();

        $("#timeList")[0].addEventListener("mousewheel", function(event) {
            var itemHeight = $("#timeList li").height();
            var totalHeight = $("#timeList").height();
            var offsetY = parseInt($("#timeList").css("top"));
            var delta = event.wheelDelta;
            if (delta < 0) {
                if ((wrapHeight - offsetY) > totalHeight) {
                    return;
                }
                offsetY -= itemHeight;
            } else {
                offsetY += itemHeight;
                offsetY = offsetY >= 0 ? 0 : offsetY;
            }
            $("#timeList").css("top", offsetY + "px");
        }, false);
    }

    function update() {
        console.log('update view');
    }

    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
        $scope.timeList = [30, 60, 120, 180, 210, 240, 270, 300, 330, 360, 390,
                           420, 450, 480, 510, 540, 570, 600, 630, 660, 690, 720,
                           750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050];
    }

    function refresh() {
        update();
    }

    init();
    refresh();
}]);