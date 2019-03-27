"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchesType(targetType, draggedItemType) {
    if (draggedItemType === null) {
        return targetType === null;
    }
    return Array.isArray(targetType)
        ? targetType.some(function (t) { return t === draggedItemType; })
        : targetType === draggedItemType;
}
exports.default = matchesType;
