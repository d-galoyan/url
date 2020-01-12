"use strict";
exports.__esModule = true;
exports.object = {
    isEmpty: function (obj) {
        if (typeof obj === 'undefined' || !obj)
            return true;
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
};
exports.isRelative = function (path) {
    return !path.includes('http');
};
exports.fromStringToParams = function (stringParams) {
    var withoutQOrH = stringParams.substring(1);
    if (!withoutQOrH)
        return {};
    var params = {};
    var vars = withoutQOrH.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return params;
};
exports.fromParamsToString = function (paramsObject) {
    var params = Object
        .keys(paramsObject)
        .map(function (name) {
        return name + "=" + encodeURIComponent(paramsObject[name]);
    });
    return params.join('&');
};
