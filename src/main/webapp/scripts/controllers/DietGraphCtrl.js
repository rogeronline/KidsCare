'use strict';

app.controller('DietGraphCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {
    var levelConfig = [
        {
            imagePath: 'images/diet_brank_bubble1.png',
            imagePositionX: 50,
            imagePositionY: 100,
            font: '30px Arial',
            fontPositionX: 40,
            fontPositionY: 130,
        },
        {
            imagePath: 'images/diet_brank_bubble2.png',
            imagePositionX: 300,
            imagePositionY: 100,
            font: '30px Arial',
            fontPositionX: 40,
            fontPositionY: 130,
        },
        {
            imagePath: 'images/diet_brank_bubble3.png',
            imagePositionX: 500,
            imagePositionY: 100,
            font: '30px Arial',
            fontPositionX: 40,
            fontPositionY: 130,
        },
        {
            imagePath: 'images/diet_brank_bubble4.png',
            imagePositionX: 50,
            imagePositionY: 150,
            font: '30px Arial',
            fontPositionX: 40,
            fontPositionY: 130,
        },
        {
            imagePath: 'images/diet_brank_bubble5.png',
            imagePositionX: 50,
            imagePositionY: 150,
            font: '30px Arial',
            fontPositionX: 40,
            fontPositionY: 130,
        }
        
    ];
    
  function updateBrands(callback) {
        var params = {
            type: 'milk',
            order: 1,
            top: 10
        };
        dataService.getBrands(params, function(data) {
            callback(data.results);
        });
    }
    
    function drawMainBubble(canvas, month){
        
    }
    
    function drawImage(currentStyle, currentResult) {
        var img = new Image();
        img.src = currentStyle.imagePath;

        img.onload = function() {
            var ctx = $scope.ctx;
            ctx.save();
            var cursor = 0, len = $scope.canvasAlpha.length;
            var fadeIn = function() {
                setTimeout(function() {
                    ctx.globalAlpha = $scope.canvasAlpha[cursor++];
                    ctx.drawImage(img, currentStyle.imagePositionX, currentStyle.fontPositionY);
                    ctx.font= currentStyle.font;
                        ctx.fillStyle = 'white';
                        ctx.fillText(currentResult.name, currentStyle.imagePositionX + currentStyle.fontPositionX, 
                        currentStyle.fontPositionY + currentStyle.fontPositionY);
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
    
    function updateGraph(){
        updateBrands(function(results){
            showMainPics();
            var canvas = $scope.canvas = jQuery('#graph_body')[0];
            var ctx = $scope.ctx = canvas.getContext('2d');
            var posArr = $scope.posArr = [[50, 100]];
            var i = 0, len = results.length;
            
            var interval = setInterval(function() {
                var currentResult = results[i];
                var currentStyle = levelConfig[+currentResult.rank - 1];
                ctx.save();
                drawImage(currentStyle, currentResult);
                ctx.restore();
                i++;
                if (i >= len) {
                    clearInterval(interval);
                    canvasEventHandler();
                }
            }, 900);
        });
    };

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
    
    function showMainPics() {
        var cursor = 0, len = $('#diet_tree #graph_main_pics .pic').length;
        if (len == 0) {
            setTimeout(function() {
                showMainPics();
            }, 400);
        } else {
            var interval = setInterval(function() {
                var ele = $('#diet_tree #graph_main_pics .pic:eq(' + cursor + ')');
                ele.fadeIn('slow');
                cursor++;
                if (cursor > len) {
                    $scope.mainPicCompleted = true;
                    clearInterval(interval);
                }
            }, 800);
        }
    }
    
    function refreshGraph() {
        updateGraph();
    }
    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
         $scope.days = "five-months";
         $scope.canvasAlpha = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55,
                              0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
    }

    function refresh() {
        refreshGraph();
    }

    init();
    refresh();
}]);