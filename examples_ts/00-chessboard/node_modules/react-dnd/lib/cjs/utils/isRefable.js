"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isClassComponent(Component) {
    return (Component &&
        Component.prototype &&
        typeof Component.prototype.render === 'function');
}
function isRefForwardingComponent(C) {
    return (C && C.$$typeof && C.$$typeof.toString() === 'Symbol(react.forward_ref)');
}
exports.isRefForwardingComponent = isRefForwardingComponent;
function isRefable(C) {
    return isClassComponent(C) || isRefForwardingComponent(C);
}
exports.isRefable = isRefable;
