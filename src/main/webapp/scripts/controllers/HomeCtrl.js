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
        $scope.now = 36 - 5;
        $scope.days = "five-months";

        $scope.canvasAlpha = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55,
                              0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
        $scope.circleStyles = {
            'disease': 'rgba(231, 173, 0, 255)',
            'food': 'rgba(65, 188, 167, 255)',
            'milestones': 'rgba(59, 134, 105, 255)',
            'growth': 'rgba(59, 211, 255, 255)',
            'pink': 'rgba(255, 76, 195, 255)',
            'green': 'rgba(84, 199, 122, 255)'
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
                        drawSmallCircles(data.smallCircles.fivePage);
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

    function drawSmallCircles(circles) {
        var ctx = $scope.ctx;
        ctx.save();
        var i = 0, len = circles.length;
        for (i; i < len; i++) {
            var circle = circles[i];
            var pos = circle.pos;
            ctx.fillStyle = $scope.circleStyles[circle.cat];
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.moveTo(pos[0] || 0, pos[1] || 0);
            ctx.arc(pos[0] || 0, pos[1] || 0, circle.radius, 2 * Math.PI, 0, true);
            ctx.fill();
        }
        ctx.restore();
    }

    function searchEventHandler() {
        $('#food_search_btn').click(function() {
            $('#food_search_box').fadeOut();
            //$scope.canvas.onmousemove = canvasMove;
        });
        $('#disease_search_box').on('click', 'img', function(e) {
            $('#upload').show();
            $(this).attr('src', './images/icon_pic.png');
        });
        $('#disease_search_box').on('click', '#disease_search_btn', function(e) {
            $('#questionnaire_detail').modal('show');
        });
        $('#disease_search_box').on('click', '#closeUpload', function(e) {
            $('.search-box').hide();
            $('#upload').hide();
            //$scope.canvas.onmousemove = canvasMove;
        });
        $('#disease_search_box').on('change', '#file', function(e) {
            $('#fileName').text($(this).val());
        });
    }


    function detectMousePosition(e) {
        var canvas = $scope.canvas;
        var bb = canvas.getBoundingClientRect();
        var x = (e.clientX - bb.left) * canvas.width / bb.width;
        var y = (e.clientY - bb.top) * canvas.height / bb.height;

        var hoveredCircle = _.find($scope.circleEles, function(circle) {
            var pos = circle.pos;
            var isInsideCircle = Math.pow(x - pos[0], 2) + Math.pow(y - pos[1], 2) <= Math.pow(circle.radius + 2, 2);
            return isInsideCircle;
        });

        return hoveredCircle;
    }

    function canvasMove(e) {
        var searchIconElem = jQuery('#search_icon');
        var isVisible = searchIconElem.is(':visible');

        var hoveredCircle = detectMousePosition(e);

        if (hoveredCircle) {
            var cat = hoveredCircle.cat;
            var searchIconClassMapping = {
                'food': 'foodSearch',
                'disease': 'diseaseSearch',
                'growth': 'growthSearch'
            };

            if (!isVisible) {
                searchIconElem.show();
                searchIconElem.removeClass().toggleClass(searchIconClassMapping[cat], true);
            }

            searchIconElem.offset({
                top: e.clientY - 60,
                left: e.clientX + 10
            });
            searchIconElem.data('circleType', cat);
        } else {
            $scope.canvas.style.cursor = 'default';
            if (isVisible) {
                searchIconElem.hide();
            }
        }
    }

    function canvasEventHandler() {
        var canvas = $scope.canvas;
        canvas.onmousemove = canvasMove;

        canvas.onmouseout = function(e) {
            //$('#search_icon').removeClass();
        };

        canvas.onclick = function(e) {
            var hoveredCircle = detectMousePosition(e);

            if (hoveredCircle) {
                // hide search icon
                jQuery('#search_icon').hide();

                var cat = hoveredCircle.cat;
                var pos = hoveredCircle.pos;

                if (cat === 'food') {
                    pos = calSearchBoxPos('food_search_box');
                    jQuery('#food_search_box').offset({
                        left: pos.left,
                        top: pos.top
                    }).fadeIn();
                } else if (cat === 'disease') {
                    pos = calSearchBoxPos('disease_search_box');
                    jQuery('#disease_search_box').offset({
                        left: pos.left,
                        top: pos.top
                    }).fadeIn();
                }
            } else {
                jQuery('#food_search_box').fadeIn();
            }
        };
    }

    function calSearchBoxPos(id) {
        var offset = $('#treeBody').offset();
        var canvasW = $scope.canvas.width;
        var canvasH = $scope.canvas.height;
        var boxW = $('#' + id).width();
        var boxH = $('#' + id).height();
        return {
            left: offset.left + (canvasW - boxW) / 2 + 50,
            top: offset.top + (canvasH - boxH) / 2
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
                if (wrapHeight - offsetY > totalHeight) {
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
