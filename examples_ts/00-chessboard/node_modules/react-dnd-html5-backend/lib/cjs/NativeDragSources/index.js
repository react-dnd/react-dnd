"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativeTypesConfig_1 = require("./nativeTypesConfig");
var NativeDragSource_1 = require("./NativeDragSource");
function createNativeDragSource(type) {
    return new NativeDragSource_1.NativeDragSource(nativeTypesConfig_1.nativeTypesConfig[type]);
}
exports.createNativeDragSource = createNativeDragSource;
function matchNativeItemType(dataTransfer) {
    if (!dataTransfer) {
        return null;
    }
    var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
    return (Object.keys(nativeTypesConfig_1.nativeTypesConfig).filter(function (nativeItemType) {
        var matchesTypes = nativeTypesConfig_1.nativeTypesConfig[nativeItemType].matchesTypes;
        return matchesTypes.some(function (t) { return dataTransferTypes.indexOf(t) > -1; });
    })[0] || null);
}
exports.matchNativeItemType = matchNativeItemType;
