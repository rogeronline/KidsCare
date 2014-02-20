'use strict';

app.controller('HomeCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {
    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
        $scope.timeList = [36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22,
                           21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
                           5, 4, 3, 2, 1];
        $scope.now = 36 - 3;
        $scope.days = "five-months";

        $scope.canvasAlpha = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55,
                              0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
        $scope.circleStyles = {
            'disease': 'rgba(231, 173, 0, 255)',
            'food': 'rgba(65, 188, 167, 255)',
            'milestones': 'rgba(59, 134, 105, 255)',
            'growth': 'rgba(59, 211, 255, 255)',
            'pink': 'rgba(255, 76, 195, 255)',
            'green': 'rgba(84, 199, 122)'
        };
        $scope.circleEles = [];
    }

    function refresh() {
        update();
    }

    function update() {
        console.log('update view');
    }

    init();
    refresh();

    $scope.$on('$viewContentLoaded', function() {
        drawTreebody();
        timeListEventsHandler();
        searchEventHandler();
    });

    $scope.dayChosen = function() {
        $scope.now = this.$index;
    };

    function drawTreebody() {
        showMainPics(picAnimate);
        var interval = setInterval(function() {
            if ($scope.mainPicCompleted) {
                renderCanvas();
                clearInterval(interval);
            }
        }, 200);
        var renderCanvas = function() {
            var canvas = $scope.canvas = jQuery('#treeBody')[0];
            var ctx = $scope.ctx = canvas.getContext('2d');
            jQuery.getJSON('./data/treeElements.json', function(data) {
                $scope.treeElements = data;
                var fiveMonthsEles = data.fiveMonths;
                var i = 0, len = fiveMonthsEles.length;
                var interval = setInterval(function() {
                    var ele = fiveMonthsEles[i];
                    if (ele.type == 'img') {
                        drawImage(ele.src, ele.pos);
                    } else if (ele.type == 'circle') {
                        $scope.circleEles.push(ele);
                        drawCircle(ele);
                    }
                    i++;
                    if (i >= len) {
                        clearInterval(interval);
                        canvasEventHandler();
                    }
                }, 50);
            });
        };
    }

    function picAnimate(ele) {
        var picUrls = ['bg', 'day-number', 'tree', 'tree-trunk'];
        var cursor = 0;
        ele.addEventListener('webkitAnimationEnd', function(event) {
            var bg = 'url("images/' + picUrls[cursor++ % 4] + '.png") no-repeat';
            $(ele).css({
                'background': bg,
                'backgroundSize': 'contain'
            });
            $(ele).removeClass('rotate').removeClass('normal');
            setTimeout(function() {
                $(ele).addClass('rotate').addClass('normal');
            }, 1);
        });
    }

    function showMainPics(callback) {
        var cursor = 0, len = $('#main_pics .pic').length;
        if (len == 0) {
            setTimeout(function() {
                showMainPics(callback);
            }, 400);
        } else {
            var interval = setInterval(function() {
                var ele = $('#main_pics .pic:eq(' + cursor + ')');
                ele.fadeIn('slow');
//                if (callback) {
//                    ele.toggleClass('rotate', true);
//                    callback(ele[0]);
//                }
                cursor++;
                if (cursor > len) {
                    $scope.mainPicCompleted = true;
                    clearInterval(interval);
                }
            }, 200);
        }
    }

    function drawImage(url, pos) {
        pos = pos.length == 0 ? [200, 100] : pos;
        var img = new Image();
        img.src = url;

        img.onload = function() {
            var ctx = $scope.ctx;
            ctx.save();
            var cursor = 0, len = $scope.canvasAlpha.length;
            var fadeIn = function() {
                setTimeout(function() {
                    ctx.globalAlpha = $scope.canvasAlpha[cursor++];
                    ctx.drawImage(img, pos[0], pos[1], img.width, img.height);
                    if (cursor <= len) {
                        fadeIn();
                    } else {
                        ctx.restore();
                    }
                }, 80);
            };
            fadeIn();
        };
    }

    function drawCircle(circle) {
        var ctx = $scope.ctx;
        ctx.save();
        var pos = circle.pos, cursor = 0, len = $scope.canvasAlpha.length;
        var fadeIn = function () {
            setTimeout(function() {
                ctx.fillStyle = ctx.strokeStyle = $scope.circleStyles[circle.cat];
                ctx.globalAlpha = $scope.canvasAlpha[cursor++];
                ctx.beginPath();
                ctx.moveTo(pos[0], pos[1]);
                ctx.arc(pos[0], pos[1], circle.radius - 6, 2 * Math.PI, 0, true);
                ctx.fill();
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.arc(pos[0], pos[1], circle.radius, 2 * Math.PI, 0, true);
                ctx.closePath();
                ctx.stroke();

                if (cursor < len) {
                    fadeIn();
                } else {
                    var text = circle.des;
                    ctx.translate(pos[0], pos[1]);
                    ctx.rotate(circle.angle * Math.PI / 180);
                    ctx.font = 'bold ' + (circle.font || 15) + 'pt sans-serif';
                    ctx.fillStyle = '#fff';
                    ctx.fillText(text, 0 - ctx.measureText(text).width / 2, 8);
                    ctx.restore();
                }
            }, 20);
        };
        fadeIn();
    }

    function searchEventHandler() {
        $("#food_search_btn").click(function() {
            $("#food_search_box").fadeOut();
            $scope.canvas.onmousemove = canvasMove;
        });
    }

    function canvasMove(e) {
        var canvas = $scope.canvas;
        var bb = canvas.getBoundingClientRect();
        var x = (e.clientX - bb.left) * (canvas.width / bb.width);
        var y = (e.clientY - bb.top) * (canvas.height / bb.height);
        var i = 0, len = $scope.circleEles.length;
        for (i; i < len; i++) {
            var circle = $scope.circleEles[i];
            var pos = circle.pos;
            if ((Math.pow(x - pos[0], 2) + Math.pow(y - pos[1], 2)) <= Math.pow(circle.radius + 2, 2)) {
                canvas.style.cursor = 'pointer';
                var cat = circle.cat;
                switch (cat) {
                    case 'food':
                        $('#search_icon').removeClass().toggleClass('food', true);
                        break;
                    case 'disease':
                        $('#search_icon').removeClass().toggleClass('disease', true);
                        break;
                    case 'milestones':
                        $('#search_icon').removeClass().toggleClass('milestones', true);
                        break;
                    case 'growth':
                        $('#search_icon').removeClass().toggleClass('growth', true);
                        break;
                    default:
                        break;
                }
                $('#search_icon').show().css({
                    left: e.clientX,
                    top: e.clientY - 100
                }).data('circleType', cat);;
                break;
            }
        }
        if (i >= len) {
            canvas.style.cursor = 'default';
            $('#search_icon').removeClass().hide();
        }
    }

    function canvasEventHandler() {
        var canvas = $scope.canvas;
        canvas.onmousemove = canvasMove;
        canvas.onmouseout = function(e) {
            $('#search_icon').removeClass();
        };
        canvas.onclick = function(e) {
            var bb = canvas.getBoundingClientRect();
            var x = (e.clientX - bb.left) * (canvas.width / bb.width);
            var y = (e.clientY - bb.top) * (canvas.height / bb.height);
            var i = 0, len = $scope.circleEles.length;
            for (i; i < len; i++) {
                var circle = $scope.circleEles[i];
                var pos = circle.pos;
                if ((Math.pow(x - pos[0], 2) + Math.pow(y - pos[1], 2)) <= Math.pow(circle.radius, 2)) {
                    var cat = circle.cat;
                    $('.search-icon').removeClass().hide();
                    $scope.canvas.onmousemove = null;
                    switch(cat) {
                        case 'food':
                            $('#food_search_box').fadeIn();
                            break;
                        case 'disease':
                            $('#disease_search_box').fadeIn();
                            break;
                        default:
                            $('#food_search_box').fadeIn();
                            break;
                    }
                }
            }
        };
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

}]);