'use strict';

app.controller('MilkDetailCtrl', ['$scope', 'dataStorage', 'channel', 'dataService',
function($scope, dataStorage, channel, dataService) {

    Raphael.fn.addGuides = function() {
        this.ca.guide = function(g) {
            return {
                guide: g
            };
        };
        this.ca.along = function(percent) {
            var g = this.attr("guide");
            var len = g.getTotalLength();
            var point = g.getPointAtLength(percent * len);
            var t = {
                transform: "t" + point.x + " " + point.y
            };
            return t;
        };
    };

    //--------------------------------------------------------------------------
    // subscribe
    //--------------------------------------------------------------------------

    channel.subscribe('brand_detail_loaded', function(data) {
        $scope.data = data;

        jQuery('#milk_powder').modal('show');
    });


    $('#milk_powder').on('shown.bs.modal', function (e) {
        var data = $scope.data;
        data.pros = sortByPercent(data.pros);
        data.cons = sortByPercent(data.cons);
        $scope.brandInfo = data;
        /*$('#milk_powder').transition({
            duration: 500,
            perspective: '4000px',
            rotate3d: '1,1,0,360deg'
        }, function(){
            //reset the transform property
            $(this).css('transform', '');
        });*/
        drawGoodKeyGraph($scope.brandInfo.pros);
        drawBadKeyGraph($scope.brandInfo.cons);

        /*$('#milk_powder').addClass("modal-animation");*/
        $('#milk_powder').animate({
            x: '1500px'
        }, 1000, 'linear', function() {
            $('#milk_powder').css('transform', '');
            $('#milk_powder').css('position', '')
                             .css('left', 0);
        });
    });

    $('#milk_powder').on('hidden.bs.modal', function (e) {
        $('#good').text("");
        $('#bad').text("");
        /*$('#milk_powder').removeClass("modal-animation");*/
        $('#milk_powder').css('position', 'fixed')
                         .css('left', '-3000px');
    });

    function drawGoodKeyGraph(data) {
        var r = Raphael("good", 500, 500),
            R = 180,
            param = {stroke: "#00c4ed", "stroke-width": 22};
        var titleAttr = {
            "font-size" : "30px",
            "font-weight" : "bold",
            "text-anchor" : "middle"
        };

        r.customAttributes.arc = function (value, total, R, lineColor) {
            var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a),
                //color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)");
                //color = "#00c4ed";
                color = lineColor;
            var path = [["M", 250, 250 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
            return {path: path, stroke: color};
        };

        drawMarks(r, R, data[0], "#00c4ed");
        var fir = r.path().attr(param).attr({arc: [0, 60, R, "#00c4ed"]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[1], "#00c4ed");
        var sec = r.path().attr(param).attr({arc: [0, 60, R, "#00c4ed"]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[2], "#00c4ed");
        var thi = r.path().attr(param).attr({arc: [0, 12, R, "#00c4ed"]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[3], "#00c4ed");
        var fou = r.path().attr(param).attr({arc: [0, 31, R, "#00c4ed"]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[4], "#00c4ed");
        var fiv = r.path().attr(param).attr({arc: [0, 12, R, "#00c4ed"]}).attr({opacity: 0.6});
        //r.circle(250, 250, 60).attr({stroke: "none", fill: Raphael.hsb2rgb(15 / 200, 1, .75).hex});
        r.image("images/pros_bg.png", 190, 190, 120, 120);
        r.text(250, 250, "Pros").attr(titleAttr);

        updateVal(data[0].value / 3 * 2, 100, 180, fir, "#16cce9");
        updateVal(data[1].value / 3 * 2, 100, 155, sec, "#53d2e7");
        updateVal(data[2].value / 3 * 2, 100, 130, thi, "#7bdae8");
        updateVal(data[3].value / 3 * 2, 100, 105, fou, "#89dde1");
        updateVal(data[4].value / 3 * 2, 100, 80, fiv, "#9de2e7");
    }

    function drawBadKeyGraph(data) {
        var r = Raphael("bad", 500, 500),
            R = 180,
            param = {stroke: "#fb915c", "stroke-width": 22};
        var titleAttr = {
            "font-size" : "30px",
            "font-weight" : "bold",
            "text-anchor" : "middle"
        };

        r.customAttributes.arc = function (value, total, R, lineColor) {
            var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = 250 + R * Math.cos(a),
                y = 250 - R * Math.sin(a),
                //color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)");
                //color = "#fb915c";
                color = lineColor;
            var path = [["M", 250, 250 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
            return {path: path, stroke: color};
        };

        drawMarks(r, R, data[0], "#ff630f");
        var fir = r.path().attr(param).attr({arc: [0, 60, R, "#ff630f"]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[1], "#ff630f");
        var sec = r.path().attr(param).attr({arc: [0, 60, R, "#ff630f"]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[2], "#ff630f");
        var thi = r.path().attr(param).attr({arc: [0, 12, R, "#ff630f"]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[3], "#ff630f");
        var fou = r.path().attr(param).attr({arc: [0, 31, R, "#ff630f"]}).attr({opacity: 0.6});
        R -= 25;
        drawMarks(r, R, data[4], "#ff630f");
        var fiv = r.path().attr(param).attr({arc: [0, 12, R, "#ff630f"]}).attr({opacity: 0.6});
        r.image("images/pros_bg.png", 190, 190, 120, 120);
        r.text(250, 250, "Cons").attr(titleAttr);

        updateVal(data[0].value / 3 * 2, 100, 180, fir, "#f9b36b");
        updateVal(data[1].value / 3 * 2, 100, 155, sec, "#ffbb71");
        updateVal(data[2].value / 3 * 2, 100, 130, thi, "#f8b77b");
        updateVal(data[3].value / 3 * 2, 100, 105, fou, "#f9ba77");
        updateVal(data[4].value / 3 * 2, 100, 80, fiv, "#f1c590");
    }

    function drawMarks(r, R, data, lineColor) {
        var pathParam = {stroke: "#0000ff", "stroke-width": 1};
        var marksAttr = {fill: lineColor, stroke: "none"};
        var percentAttr = {
            "font-size" : "14px",
            "font-weight" : "bold",
            "color" : lineColor,
            "text-anchor" : "end"
        };
        var out = r.set();
        var alpha = 360 / 12 * 8,
            a = (90 - alpha) * Math.PI / 180,
            x = 250 + R * Math.cos(a),
            y = 250 - R * Math.sin(a);
        out.push(r.path().attr(pathParam).attr({arc: [8, 12, R, lineColor]}));
        out.push(r.circle(x, y, 5).attr(marksAttr));
        out.push(r.text(x, y - 19, data.value + "%").attr(percentAttr));

        var alpha = 360 / 12 * 12,
            a = (90 - alpha) * Math.PI / 180,
            x = 250 + R * Math.cos(a),
            y = 250 - R * Math.sin(a);
        out.push(r.text(x - 20, y, data.name).attr(percentAttr));
        return out;
    }

    function updateVal(value, total, R, hand, lineColor) {
        hand.animate({arc: [value, total, R, lineColor]}, 900, "linear");
    }

    function sortByPercent(data) {
        var orderedList =_.sortBy(data, "value").reverse();
        return orderedList;
    }

    $('.milk-dismiss').on('click', function() {
        $('#milk_powder').modal('hide');
    });

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