'use strict';

app.controller('HomeCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $scope.$on('$viewContentLoaded', function() {
        drawTreebody();
        picAnimate();
        timeListEventsHandler();
    });

    $scope.dayChosen = function() {
        $scope.now = this.$index;
    };

    function drawTreebody() {
        var canvas = $scope.canvas = jQuery('#treeBody')[0];
        var ctx = canvas.getContext('2d');
        var posArr = $scope.posArr = [[342, 634], [242, 624], [442, 624], [142, 534], [542, 534],
                      [242, 534], [342, 534], [442, 534],
                      [42, 434], [142, 434], [242, 434], [342, 434], [442, 434], [542, 434], [642, 434],
                      [0, 334], [100, 334], [200, 334], [300, 334], [400, 334], [500, 334], [600, 334],
                      [0, 234], [100, 234], [200, 234], [300, 234], [400, 234], [500, 234], [600, 234],
                      [42, 134], [142, 134], [242, 134], [342, 134], [442, 134], [542, 134], [642, 134],
                      [242, 34], [342, 34], [442, 34]];
        var i = 0, len = posArr.length;
        var interval = setInterval(function() {
            var pos = posArr[i++];
            pos.opacity = 0.1;
            ctx.save();
            function fadeIn() {
                setTimeout(function() {
                    ctx.fillStyle = 'rgba(0, 0, 255,' + pos.opacity + ')';
                    ctx.beginPath();
                    ctx.moveTo(pos[0], pos[1]);
                    ctx.arc(pos[0], pos[1], 50, 2 * Math.PI, 0, true);
                    ctx.fill();
                    pos.opacity += 0.05;
                    if (pos.opacity < 1) {
                        ctx.fillStyle = 'rgba(0, 0, 255,' + pos.opacity + ')';
                        fadeIn();
                    }
                }, 50);
            }
            fadeIn();
            ctx.restore();
            if (i >= len) {
                clearInterval(interval);
                canvasEventHandler();
            }
        }, 100);
    }

    function canvasEventHandler() {
        var canvas = $scope.canvas;
        canvas.onmousemove = function(e) {
            var bb = canvas.getBoundingClientRect();
            var x = (e.clientX - bb.left) * (canvas.width / bb.width);
            var y = (e.clientY - bb.top) * (canvas.height / bb.height);
            var pixels = canvas.getContext('2d').getImageData(x, y, 1, 1);
            var i = 3, len = pixels.data.length;
            for (i; i < len; i += 4) {
                if (pixels.data[i] != 0 ) {
                    canvas.style.cursor = 'pointer';
                    break;
                }
            }
            if (i >= len) {
                canvas.style.cursor = 'default';
            }
        };
        canvas.onclick = function(e) {
            var bb = canvas.getBoundingClientRect();
            var x = (e.clientX - bb.left) * (canvas.width / bb.width);
            var y = (e.clientY - bb.top) * (canvas.height / bb.height);
            var i = 0, len = $scope.posArr.length;
            for (i; i < len; i++) {
                var pos = $scope.posArr[i];
                if ((Math.pow(x - pos[0], 2) + Math.pow(y - pos[1], 2)) <= Math.pow(50, 2)) {
                    alert("circle" + i);
                }
            }
        };
    }

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