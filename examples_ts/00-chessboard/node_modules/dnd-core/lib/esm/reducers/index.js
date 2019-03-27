import dragOffset from './dragOffset';
import dragOperation from './dragOperation';
import refCount from './refCount';
import dirtyHandlerIds from './dirtyHandlerIds';
import stateId from './stateId';
const get = require('lodash/get');
export default function reduce(state = {}, action) {
    return {
        dirtyHandlerIds: dirtyHandlerIds(state.dirtyHandlerIds, {
            type: action.type,
            payload: Object.assign({}, action.payload, { prevTargetIds: get(state, 'dragOperation.targetIds', []) }),
        }),
        dragOffset: dragOffset(state.dragOffset, action),
        refCount: refCount(state.refCount, action),
        dragOperation: dragOperation(state.dragOperation, action),
        stateId: stateId(state.stateId),
    };
}
