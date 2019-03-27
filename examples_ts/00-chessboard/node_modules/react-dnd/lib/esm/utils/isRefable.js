function isClassComponent(Component) {
    return (Component &&
        Component.prototype &&
        typeof Component.prototype.render === 'function');
}
export function isRefForwardingComponent(C) {
    return (C && C.$$typeof && C.$$typeof.toString() === 'Symbol(react.forward_ref)');
}
export function isRefable(C) {
    return isClassComponent(C) || isRefForwardingComponent(C);
}
