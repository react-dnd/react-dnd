"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DragDropContext_1 = require("../../DragDropContext");
var invariant = require('invariant');
/**
 * A hook to retrieve the DragDropManager from Context
 */
function useDragDropManager() {
    var dragDropManager = react_1.useContext(DragDropContext_1.context).dragDropManager;
    invariant(dragDropManager != null, 'Expected drag drop context');
    return dragDropManager;
}
exports.useDragDropManager = useDragDropManager;
