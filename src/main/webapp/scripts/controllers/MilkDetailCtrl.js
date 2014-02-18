'use strict';

app.controller('MilkDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    $('#milk_powder').on('shown.bs.modal', function (e) {
        drawGoodKeyGraph();
        drawBadKeyGraph();
    });

    function drawGoodKeyGraph() {
        var r = Raphael("good", 500, 500),
            R = 180,
            param = {stroke: "#fff", "stroke-width": 15},
            marksAttr = {fill: "#444", stroke: "none"};

        r.customAttributes.arc = function (value, total, R) {
            var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a),
                color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)");
            var path = [["M", 250, 250 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
            return {path: path, stroke: color};
        };

        drawMarks(R);
        var fir = r.path().attr(param).attr({arc: [0, 60, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(R);
        var sec = r.path().attr(param).attr({arc: [0, 60, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(R);
        var thi = r.path().attr(param).attr({arc: [0, 12, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(R);
        var fou = r.path().attr(param).attr({arc: [0, 31, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(R);
        var fiv = r.path().attr(param).attr({arc: [0, 12, R]}).attr({opacity: 0.6});

        function drawMarks(R) {
            var pathParam = {stroke: "#fff", "stroke-width": 1};
            var color = "hsb(".concat(Math.round(R) / 200, ", 1, .75)"),
                out = r.set();
            var alpha = 360 / 12 * 8,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a);
            out.push(r.path().attr(pathParam).attr({arc: [8, 12, R]}));
            out.push(r.circle(x, y, 5).attr(marksAttr));
            out.push(r.text(x, y - 20, "40%"));

            var alpha = 360 / 12 * 12,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a);
            out.push(r.text(x - 100, y, "Allergic"));
            return out;
        }

        function updateVal(value, total, R, hand) {
            hand.animate({arc: [value, total, R]}, 900, "elastic");
        }

        updateVal(60, 100, 180, fir);
        updateVal(50, 100, 155, sec);
        updateVal(47, 100, 130, thi);
        updateVal(35, 100, 105, fou);
        updateVal(27, 100, 80, fiv);
    }

    function drawBadKeyGraph() {
        var r = Raphael("bad", 500, 500),
            R = 180,
            param = {stroke: "#fff", "stroke-width": 15},
            marksAttr = {fill: "#444", stroke: "none"};

        r.customAttributes.arc = function (value, total, R) {
            var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a),
                color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)");
            var path = [["M", 250, 250 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
            return {path: path, stroke: color};
        };

        drawMarks(R);
        var fir = r.path().attr(param).attr({arc: [0, 60, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(R);
        var sec = r.path().attr(param).attr({arc: [0, 60, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(R);
        var thi = r.path().attr(param).attr({arc: [0, 12, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(R);
        var fou = r.path().attr(param).attr({arc: [0, 31, R]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(R);
        var fiv = r.path().attr(param).attr({arc: [0, 12, R]}).attr({opacity: 0.6});

        function drawMarks(R) {
            var pathParam = {stroke: "#fff", "stroke-width": 1};
            var color = "hsb(".concat(Math.round(R) / 200, ", 1, .75)"),
                out = r.set();
            var alpha = 360 / 12 * 8,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a);
            out.push(r.path().attr(pathParam).attr({arc: [8, 12, R]}));
            out.push(r.circle(x, y, 5).attr(marksAttr));
            out.push(r.text(x, y - 20, "40%"));

            var alpha = 360 / 12 * 12,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a);
            out.push(r.text(x - 100, y, "Allergic"));
            return out;
        }

        function updateVal(value, total, R, hand) {
            hand.animate({arc: [value, total, R]}, 900, "elastic");
        }

        updateVal(60, 100, 180, fir);
        updateVal(50, 100, 155, sec);
        updateVal(47, 100, 130, thi);
        updateVal(35, 100, 105, fou);
        updateVal(27, 100, 80, fiv);
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