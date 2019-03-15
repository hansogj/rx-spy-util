"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_defined_1 = require("array.defined");
exports.lastCall = function (spy, argNr) {
    if (argNr === void 0) { argNr = 0; }
    if (array_defined_1.defined(spy.calls.mostRecent())) {
        return spy.calls.mostRecent().args[argNr];
    }
    throw new Error(("Spy " + (array_defined_1.defined(spy.name) ? spy.name : spy.and.identity) + " has not been called").replace(/\s\s/, '  '));
};
var SpyUtil = /** @class */ (function () {
    function SpyUtil() {
        this.subscriptions = [];
        this.spies = {};
    }
    SpyUtil.prototype.spySubscribe = function (obj, id) {
        var spy = jasmine.createSpy("" + id);
        this.subscribeOn(obj.subscribe(spy));
        this.spies[id] = spy;
    };
    SpyUtil.prototype.spyException = function (obj, id) {
        var spy = jasmine.createSpy("" + id);
        this.subscribeOn(obj.subscribe(undefined, spy));
        this.spies[id] = spy;
    };
    SpyUtil.prototype.spySuccessAndException = function (obj, id, idException) {
        var spy = jasmine.createSpy("" + id);
        var spyException = jasmine.createSpy(idException);
        this.subscribeOn(obj.subscribe(spy, spyException));
        this.spies[id] = spy;
        this.spies[idException] = spyException;
    };
    SpyUtil.prototype.get = function (id) {
        return this.spies[id];
    };
    SpyUtil.prototype.argsFor = function (id, callIndex) {
        return this.spies[id].calls.argsFor(callIndex);
    };
    SpyUtil.prototype.lastOf = function (id) {
        return exports.lastCall(this.spies[id]);
    };
    SpyUtil.prototype.lastOfAll = function () {
        return this.all().map(function (spy) { return exports.lastCall(spy); });
    };
    SpyUtil.prototype.all = function () {
        var _this = this;
        return Object.keys(this.spies).map(function (key) { return _this.spies[key]; });
    };
    SpyUtil.prototype.allCounts = function () {
        return this.all().map(function (spy) { return spy.calls.count(); });
    };
    SpyUtil.prototype.filter = function (filter) {
        var _this = this;
        return Object.keys(this.spies)
            .filter(filter)
            .map(function (key) { return _this.spies[key]; });
    };
    SpyUtil.prototype.unsubscribe = function () {
        this.all().forEach(function (spy) { return spy.calls.reset(); });
        this.subscriptions.filter(function (subscriber) { return array_defined_1.defined(subscriber); }).forEach(function (subscriber) { return subscriber.unsubscribe(); });
        this.subscriptions = [];
    };
    SpyUtil.prototype.subscribeOn = function (subscription) {
        this.subscriptions.push(subscription);
    };
    return SpyUtil;
}());
exports.SpyUtil = SpyUtil;
//# sourceMappingURL=index.js.map