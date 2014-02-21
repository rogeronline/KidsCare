'use strict';

app.controller('MilkDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $('#milk_powder').on('shown.bs.modal', function (e) {
        var params = {};
        dataService.getBrand(params, function(data) {
            data.pros = sortByPercent(data.pros);
            data.cons = sortByPercent(data.cons);
            $scope.brandInfo = data;
            $('#milk_powder').transition({
                duration: 500,
                perspective: '4000px',
                rotate3d: '1,1,0,360deg'
            }, function(){
                //reset the transform property
                $(this).css('transform', '');
            });
            drawGoodKeyGraph($scope.brandInfo.pros);
            drawBadKeyGraph($scope.brandInfo.cons);
        });
        dataService.getRelatedPostsByBrand(params, function(data) {
            $scope.posts = data.results;
        });
    });

    $('#milk_powder').on('hidden.bs.modal', function (e) {
        $('#good').text("");
        $('#bad').text("");
    });

    var marksAttr = {fill: "#444", stroke: "none"};

    function drawGoodKeyGraph(data) {
        var r = Raphael("good", 500, 500),
            R = 180,
            param = {stroke: "#fff", "stroke-width": 15};

        r.customAttributes.arc = function (value, total, R) {
            var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a),
                color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)");
            var path = [["M", 250, 250 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
            return {path: path, stroke: color};
        };

        drawMarks(r, R, data[0]);
        var fir = r.path().attr(param).attr({arc: [0, 60, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[1]);
        var sec = r.path().attr(param).attr({arc: [0, 60, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[2]);
        var thi = r.path().attr(param).attr({arc: [0, 12, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[3]);
        var fou = r.path().attr(param).attr({arc: [0, 31, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[4]);
        var fiv = r.path().attr(param).attr({arc: [0, 12, R]}).attr({opacity: 0.6});
        r.circle(250, 250, 60).attr({stroke: "none", fill: Raphael.hsb2rgb(15 / 200, 1, .75).hex});

        updateVal(data[0].value / 3 * 2, 100, 180, fir);
        updateVal(data[1].value / 3 * 2, 100, 155, sec);
        updateVal(data[2].value / 3 * 2, 100, 130, thi);
        updateVal(data[3].value / 3 * 2, 100, 105, fou);
        updateVal(data[4].value / 3 * 2, 100, 80, fiv);
    }

    function drawBadKeyGraph(data) {
        var r = Raphael("bad", 500, 500),
            R = 180,
            param = {stroke: "#fff", "stroke-width": 15};

        r.customAttributes.arc = function (value, total, R) {
            var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a),
                color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)");
            var path = [["M", 250, 250 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
            return {path: path, stroke: color};
        };

        drawMarks(r, R, data[0]);
        var fir = r.path().attr(param).attr({arc: [0, 60, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[1]);
        var sec = r.path().attr(param).attr({arc: [0, 60, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[2]);
        var thi = r.path().attr(param).attr({arc: [0, 12, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[3]);
        var fou = r.path().attr(param).attr({arc: [0, 31, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[4]);
        var fiv = r.path().attr(param).attr({arc: [0, 12, R]}).attr({opacity: 0.6});
        r.circle(250, 250, 60).attr({stroke: "none", fill: Raphael.hsb2rgb(15 / 200, 1, .75).hex});

        updateVal(data[0].value / 3 * 2, 100, 180, fir);
        updateVal(data[1].value / 3 * 2, 100, 155, sec);
        updateVal(data[2].value / 3 * 2, 100, 130, thi);
        updateVal(data[3].value / 3 * 2, 100, 105, fou);
        updateVal(data[4].value / 3 * 2, 100, 80, fiv);
    }

    function drawMarks(r, R, data, lineColor, infoColor) {
        var pathParam = {stroke: "#fff", "stroke-width": 1};
        var color = "hsb(".concat(Math.round(R) / 200, ", 1, .75)"),
            out = r.set();
        var alpha = 360 / 12 * 8,
            a = (90 - alpha) * Math.PI / 180,
            x = 250 + R * Math.cos(a),
            y = 250 - R * Math.sin(a);
        out.push(r.path().attr(pathParam).attr({arc: [8, 12, R]}));
        out.push(r.circle(x, y, 5).attr(marksAttr));
        out.push(r.text(x, y - 20, data.value + "%"));

        var alpha = 360 / 12 * 12,
            a = (90 - alpha) * Math.PI / 180,
            x = 250 + R * Math.cos(a),
            y = 250 - R * Math.sin(a);
        out.push(r.text(x - 100, y, data.name));
        return out;
    }

    function updateVal(value, total, R, hand) {
        hand.animate({arc: [value, total, R]}, 900, "linear");
    }

    function sortByPercent(data) {
        var orderedList =_.sortBy(data, "value").reverse();
        return orderedList;
    }

    //--------------------------------------------------------------------------
    // bootstrap
    //--------------------------------------------------------------------------

    function init() {
    }

    function refresh() {
    }

    init();
    refresh();
}]);