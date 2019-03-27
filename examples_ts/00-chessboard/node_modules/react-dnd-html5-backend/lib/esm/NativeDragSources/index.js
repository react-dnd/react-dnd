import { nativeTypesConfig } from './nativeTypesConfig';
import { NativeDragSource } from './NativeDragSource';
export function createNativeDragSource(type) {
    return new NativeDragSource(nativeTypesConfig[type]);
}
export function matchNativeItemType(dataTransfer) {
    if (!dataTransfer) {
        return null;
    }
    const dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
    return (Object.keys(nativeTypesConfig).filter(nativeItemType => {
        const { matchesTypes } = nativeTypesConfig[nativeItemType];
        return matchesTypes.some(t => dataTransferTypes.indexOf(t) > -1);
    })[0] || null);
}
