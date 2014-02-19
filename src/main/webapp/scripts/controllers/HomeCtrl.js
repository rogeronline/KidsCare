'use strict';

app.controller('HomeCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $scope.$on('$viewContentLoaded', function() {
        picAnimate();
        timeListEventsHandler();
    });

    $scope.dayChosen = function() {
        $scope.now = this.$index;
    };

    function picAnimate() {
        var pic = $('#pic')[0];
        var picUrls = ['bg', 'day-number', 'tree', 'tree-trunk'];
        var cursor = 0;
        pic.addEventListener('webkitAnimationEnd', function(event) {
            var bg = 'url("images/' + picUrls[cursor++ % 4] + '.png") no-repeat';
            $(pic).css({
                'background': bg,
                'backgroundSize': 'contain'
            });
            $(pic).removeClass('rotate').removeClass('normal');
            setTimeout(function() {
                $(pic).addClass('rotate').addClass('normal');
            }, 1);
        });
    }

    function timeListEventsHandler() {
        mousewheelHandler();
    }

    function mousewheelHandler() {
        var wrapHeight = $('#timeAxis').height();

        $('#timeList')[0].addEventListener('mousewheel', function(event) {
            var itemHeight = $('#timeList li').height();
            var totalHeight = $('#timeList').height();
            var offsetY = parseInt($('#timeList').css('bottom'));
            var delta = event.wheelDelta;
            if (delta > 0) {
                if ((wrapHeight - offsetY) > totalHeight) {
                    return;
                }
                offsetY -= itemHeight;
            } else {
                offsetY += itemHeight;
                offsetY = offsetY >= 0 ? 0 : offsetY;
            }
            $('#timeList').css('bottom', offsetY + 'px');
        }, false);
    }

    function update() {
        console.log('update view');
    }

    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
        $scope.timeList = [36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22,
                           21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
                           5, 4, 3, 2, 1];
        $scope.now = 36 - 3;
    }

    function refresh() {
        update();
    }

    init();
    refresh();
}]);