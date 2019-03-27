"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeDragSource = /** @class */ (function () {
    function NativeDragSource(config) {
        var _this = this;
        this.config = config;
        this.item = {};
        Object.keys(this.config.exposeProperties).forEach(function (property) {
            Object.defineProperty(_this.item, property, {
                configurable: true,
                enumerable: true,
                get: function () {
                    // tslint:disable-next-line no-console
                    console.warn("Browser doesn't allow reading \"" + property + "\" until the drop event.");
                    return null;
                },
            });
        });
    }
    NativeDragSource.prototype.mutateItemByReadingDataTransfer = function (dataTransfer) {
        var _this = this;
        var newProperties = {};
        if (dataTransfer) {
            Object.keys(this.config.exposeProperties).forEach(function (property) {
                newProperties[property] = {
                    value: _this.config.exposeProperties[property](dataTransfer, _this.config.matchesTypes),
                };
            });
        }
        Object.defineProperties(this.item, newProperties);
    };
    NativeDragSource.prototype.canDrag = function () {
        return true;
    };
    NativeDragSource.prototype.beginDrag = function () {
        return this.item;
    };
    NativeDragSource.prototype.isDragging = function (monitor, handle) {
        return handle === monitor.getSourceId();
    };
    NativeDragSource.prototype.endDrag = function () {
        // empty
    };
    return NativeDragSource;
}());
exports.NativeDragSource = NativeDragSource;
