"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var Url = /** @class */ (function () {
    function Url(url) {
        if (url === void 0) { url = window.location.href; }
        this.query = {};
        this.hash = {};
        if (utils_1.isRelative(url)) {
            url = window.location.origin + url;
        }
        this.url = new URL(url);
        if (this.url.href.includes('?')) {
            this.query = Object.freeze(utils_1.fromStringToParams(this.url.search));
        }
        if (this.url.href.includes('#')) {
            this.hash = Object.freeze(utils_1.fromStringToParams(this.url.hash));
        }
    }
    Object.defineProperty(Url.prototype, "search", {
        get: function () {
            return this.url.search;
        },
        enumerable: true,
        configurable: true
    });
    Url.prototype.includes = function (pathname) {
        return new RegExp(pathname + "([?/#]|$)").test(this.pathname);
    };
    Object.defineProperty(Url.prototype, "hashString", {
        get: function () {
            if (utils_1.object.isEmpty(this.hash))
                return '';
            return '#' + utils_1.fromParamsToString(this.hash);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "hostname", {
        get: function () {
            return this.url.hostname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "origin", {
        get: function () {
            return this.url.origin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "pathname", {
        get: function () {
            return this.url.pathname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "queryString", {
        get: function () {
            if (utils_1.object.isEmpty(this.query))
                return '';
            return '?' + utils_1.fromParamsToString(this.query);
        },
        enumerable: true,
        configurable: true
    });
    Url.prototype.toString = function () {
        return this.origin + this.pathname + this.queryString + this.hashString;
    };
    return Url;
}());
exports.Url = Url;
var UrlBuilder = /** @class */ (function () {
    function UrlBuilder(url) {
        this.url = url;
        this.pathname = this.url.pathname;
        this.origin = this.url.origin;
    }
    UrlBuilder.prototype.setOrigin = function (origin) {
        this.origin = origin;
        return this;
    };
    UrlBuilder.prototype.removeOrigin = function () {
        this.origin = '';
        return this;
    };
    UrlBuilder.prototype.setPathname = function (pathname) {
        this.pathname = pathname;
        return this;
    };
    UrlBuilder.prototype.removePathname = function (pathname) {
        this.pathname = this.pathname.replace(pathname, '');
        return this;
    };
    UrlBuilder.prototype.addPathnameFromStart = function (pathname) {
        this.pathname = pathname + this.pathname;
        return this;
    };
    UrlBuilder.prototype.addQuery = function (name, value) {
        this.url.query[name] = value;
        return this;
    };
    UrlBuilder.prototype.addHash = function (name, value) {
        this.url.hash[name] = value;
        return this;
    };
    UrlBuilder.prototype.removeQuery = function (name) {
        delete this.url.query[name];
        return this;
    };
    UrlBuilder.prototype.removeQueryAll = function () {
        var query = this.url.query;
        for (var queryName in query) {
            if (query.hasOwnProperty(queryName)) {
                delete query[queryName];
            }
        }
        return this;
    };
    UrlBuilder.prototype.removeHash = function (name) {
        delete this.url.hash[name];
        return this;
    };
    UrlBuilder.prototype.removeHashAll = function () {
        var hash = this.url.hash;
        for (var queryName in hash) {
            if (hash.hasOwnProperty(queryName)) {
                delete hash[queryName];
            }
        }
        return this;
    };
    UrlBuilder.prototype.build = function () {
        return new Url(this.getOrigin() + this.getPathname() + this.getQuery() + this.getHash());
    };
    UrlBuilder.prototype.getQuery = function () {
        return this.url.queryString;
    };
    UrlBuilder.prototype.getHash = function () {
        return this.url.hashString;
    };
    UrlBuilder.prototype.getOrigin = function () {
        return this.origin;
    };
    UrlBuilder.prototype.getPathname = function () {
        return this.pathname;
    };
    return UrlBuilder;
}());
exports.UrlBuilder = UrlBuilder;
