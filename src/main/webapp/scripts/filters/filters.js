'use strict';

app.filter('percentage', ['$filter', function($filter) {
    var exports = function(input) {
        return $filter('number')(input * 100, 1) + '%';
    };

    return exports;
}]);


/**
format string can be composed of the following elements:
'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
'MMMM': Month in year (January-December)
'MMM': Month in year (Jan-Dec)
'MM': Month in year, padded (01-12)
'M': Month in year (1-12)
'dd': Day in month, padded (01-31)
'd': Day in month (1-31)
'EEEE': Day in Week,(Sunday-Saturday)
'EEE': Day in Week, (Sun-Sat)
'HH': Hour in day, padded (00-23)
'H': Hour in day (0-23)
'hh': Hour in am/pm, padded (01-12)
'h': Hour in am/pm, (1-12)
'mm': Minute in hour, padded (00-59)
'm': Minute in hour (0-59)
'ss': Second in minute, padded (00-59)
's': Second in minute (0-59)
'.sss' or ',sss': Millisecond in second, padded (000-999)
'a': am/pm marker
'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)

shortcut:
'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 pm)
'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 pm)
'fullDate': equivalent to 'EEEE, MMMM d,y' for en_US locale (e.g. Friday, September 3, 2010)
'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010)
'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 pm)
'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 pm)
*/
app.filter('time', ['$filter', function($filter) {
    try {
        var exports = function(input, format) {
            var utcTime = new Date(input);
            var timezoneOffset = utcTime.getTimezoneOffset() * 60 * 1000;
            var localeTime = new Date(utcTime.getTime() + timezoneOffset);

            return $filter('date')(localeTime, format);
        };

        return exports;
    } catch (e) {
        console.log(e);
    }
}]);

/**
 * A replacement utility for internationalization.
 *
 * @param replace {mixed} The tokens to replace depends on type
 *  string: all instances of {0} will be replaced
 *  array: each instance of {0}, {1}, {2} etc. will be placed with each array item in corresponding order
 *  object: all attributes will be iterated through, with {key} being replaced with its corresponding value
 * @return string
 *
 * @example: 'Hello {name}, how are you {day}'.format({ name:'John', day:'Today' })
 * @example: 'Records {0} to {1} out of {2} total'.format(['10', '20', '3000'])
 * @example: '{0} agrees to all mentions {0} makes in the event that {0} hits a tree while {0} is driving drunk'.format('Bob')
 */
app.filter('format', function() {
    return function(value, replace) {
        var target = value;

        if (angular.isString(target) && replace !== undefined) {
            if (!angular.isArray(replace) && !angular.isObject(replace)) {
                replace = [replace];
            }

            var placeholder = /\{([^\}]+)\}/g; // {key}
            target = target.replace(placeholder, function(str, key) {
                var result = str;
                if (key in replace) {
                    result = replace[key];
                }
                return result;
            });
        }

        return target;
    };
});