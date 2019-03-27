import * as NativeTypes from '../NativeTypes';
import { getDataFromDataTransfer } from './getDataFromDataTransfer';
export const nativeTypesConfig = {
    [NativeTypes.FILE]: {
        exposeProperties: {
            files: (dataTransfer) => Array.prototype.slice.call(dataTransfer.files),
            items: (dataTransfer) => dataTransfer.items,
        },
        matchesTypes: ['Files'],
    },
    [NativeTypes.URL]: {
        exposeProperties: {
            urls: (dataTransfer, matchesTypes) => getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n'),
        },
        matchesTypes: ['Url', 'text/uri-list'],
    },
    [NativeTypes.TEXT]: {
        exposeProperties: {
            text: (dataTransfer, matchesTypes) => getDataFromDataTransfer(dataTransfer, matchesTypes, ''),
        },
        matchesTypes: ['Text', 'text/plain'],
    },
};
