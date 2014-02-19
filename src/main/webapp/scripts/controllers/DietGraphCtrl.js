'use strict';

app.controller('DietGraphCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {
    function generateGraph(){
          var canvas = $scope.canvas = jQuery('#graph_body')[0];
        var ctx = canvas.getContext('2d');
        var posArr = $scope.posArr = [[12, 24]];
        var i = 0, len = posArr.length;
        var interval = setInterval(function() {
            var pos = posArr[i++];
            pos.opacity = 0.1;
            ctx.save();
            function fadeIn() {
                setTimeout(function() {
/*                    ctx.fillStyle = 'rgba(0, 0, 255,' + pos.opacity + ')';
                    ctx.beginPath();
                    ctx.moveTo(pos[0], pos[1]);
                    ctx.arc(pos[0], pos[1], 50, 2 * Math.PI, 0, true);
                    ctx.fill();*/
                   var image = new Image();
                   image.src = 'images/diet-bubble1.png';
                   ctx.font= "30px Arial";
                   ctx.fillStyle = 'white';
                   ctx.drawImage(image, pos[0], pos[1]);
                   ctx.fillText('test', pos[0]+20, pos[1]+100);
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

    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
        generateGraph();
    }

    function refresh() {
    }

    init();
    refresh();
}]);