// cheap lodash replacements
export function isFunction(input) {
    return typeof input === 'function';
}
export function noop() {
    // noop
}
function isObjectLike(input) {
    return typeof input === 'object' && input !== null;
}
export function isPlainObject(input) {
    if (!isObjectLike(input)) {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}
//# sourceMappingURL=js_utils.js.map