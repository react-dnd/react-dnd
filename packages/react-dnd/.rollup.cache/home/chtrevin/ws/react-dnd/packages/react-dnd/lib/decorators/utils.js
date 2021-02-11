export function getDecoratedComponent(instanceRef) {
    const currentRef = instanceRef.current;
    if (currentRef == null) {
        return null;
    }
    else if (currentRef.decoratedRef) {
        // go through the private field in decorateHandler to avoid the invariant hit
        return currentRef.decoratedRef.current;
    }
    else {
        return currentRef;
    }
}
export function isClassComponent(Component) {
    return (Component &&
        Component.prototype &&
        typeof Component.prototype.render === 'function');
}
export function isRefForwardingComponent(C) {
    const item = C;
    return item?.$$typeof?.toString() === 'Symbol(react.forward_ref)';
}
export function isRefable(C) {
    return isClassComponent(C) || isRefForwardingComponent(C);
}
export function checkDecoratorArguments(functionName, signature, ...args) {
    if (process.env.NODE_ENV !== 'production') {
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg && arg.prototype && arg.prototype.render) {
                // eslint-disable-next-line no-console
                console.error('You seem to be applying the arguments in the wrong order. ' +
                    `It should be ${functionName}(${signature})(Component), not the other way around. ` +
                    'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#you-seem-to-be-applying-the-arguments-in-the-wrong-order');
                return;
            }
        }
    }
}
//# sourceMappingURL=utils.js.map