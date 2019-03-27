export default function isValidType(type, allowArray) {
    return (typeof type === 'string' ||
        typeof type === 'symbol' ||
        (!!allowArray &&
            Array.isArray(type) &&
            type.every(t => isValidType(t, false))));
}
