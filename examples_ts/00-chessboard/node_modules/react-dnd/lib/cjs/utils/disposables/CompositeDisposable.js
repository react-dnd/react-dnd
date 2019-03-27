"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a group of disposable resources that are disposed together.
 * @constructor
 */
var CompositeDisposable = /** @class */ (function () {
    function CompositeDisposable() {
        var disposables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            disposables[_i] = arguments[_i];
        }
        this.isDisposed = false;
        this.disposables = disposables;
    }
    /**
     * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
     * @param {Any} item Disposable to add.
     */
    CompositeDisposable.prototype.add = function (item) {
        if (this.isDisposed) {
            item.dispose();
        }
        else {
            this.disposables.push(item);
        }
    };
    /**
     * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
     * @param {Any} item Disposable to remove.
     * @returns {Boolean} true if found; false otherwise.
     */
    CompositeDisposable.prototype.remove = function (item) {
        var shouldDispose = false;
        if (!this.isDisposed) {
            var idx = this.disposables.indexOf(item);
            if (idx !== -1) {
                shouldDispose = true;
                this.disposables.splice(idx, 1);
                item.dispose();
            }
        }
        return shouldDispose;
    };
    /**
     *  Disposes all disposables in the group and removes them from the group but
     *  does not dispose the CompositeDisposable.
     */
    CompositeDisposable.prototype.clear = function () {
        if (!this.isDisposed) {
            var len = this.disposables.length;
            var currentDisposables = new Array(len);
            for (var i = 0; i < len; i++) {
                currentDisposables[i] = this.disposables[i];
            }
            this.disposables = [];
            for (var i = 0; i < len; i++) {
                currentDisposables[i].dispose();
            }
        }
    };
    /**
     *  Disposes all disposables in the group and removes them from the group.
     */
    CompositeDisposable.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            var len = this.disposables.length;
            var currentDisposables = new Array(len);
            for (var i = 0; i < len; i++) {
                currentDisposables[i] = this.disposables[i];
            }
            this.disposables = [];
            for (var i = 0; i < len; i++) {
                currentDisposables[i].dispose();
            }
        }
    };
    return CompositeDisposable;
}());
exports.CompositeDisposable = CompositeDisposable;
