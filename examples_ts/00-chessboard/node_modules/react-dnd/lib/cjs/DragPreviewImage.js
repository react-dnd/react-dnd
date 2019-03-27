"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/*
 * A utility for rendering a drag preview image
 */
var DragPreviewImage = React.memo(function (_a) {
    var connect = _a.connect, src = _a.src;
    if (typeof Image !== 'undefined') {
        var img_1 = new Image();
        img_1.src = src;
        img_1.onload = function () { return connect(img_1); };
    }
    return null;
});
exports.default = DragPreviewImage;
