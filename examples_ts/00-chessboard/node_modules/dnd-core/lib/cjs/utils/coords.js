"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Coordinate addition
 * @param a The first coordinate
 * @param b The second coordinate
 */
function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}
exports.add = add;
/**
 * Coordinate subtraction
 * @param a The first coordinate
 * @param b The second coordinate
 */
function subtract(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}
exports.subtract = subtract;
/**
 * Returns the cartesian distance of the drag source component's position, based on its position
 * at the time when the current drag operation has started, and the movement difference.
 *
 * Returns null if no item is being dragged.
 *
 * @param state The offset state to compute from
 */
function getSourceClientOffset(state) {
    var clientOffset = state.clientOffset, initialClientOffset = state.initialClientOffset, initialSourceClientOffset = state.initialSourceClientOffset;
    if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
        return null;
    }
    return subtract(add(clientOffset, initialSourceClientOffset), initialClientOffset);
}
exports.getSourceClientOffset = getSourceClientOffset;
/**
 * Determines the x,y offset between the client offset and the initial client offset
 *
 * @param state The offset state to compute from
 */
function getDifferenceFromInitialOffset(state) {
    var clientOffset = state.clientOffset, initialClientOffset = state.initialClientOffset;
    if (!clientOffset || !initialClientOffset) {
        return null;
    }
    return subtract(clientOffset, initialClientOffset);
}
exports.getDifferenceFromInitialOffset = getDifferenceFromInitialOffset;
