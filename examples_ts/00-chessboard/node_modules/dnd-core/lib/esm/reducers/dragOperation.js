import { BEGIN_DRAG, PUBLISH_DRAG_SOURCE, HOVER, END_DRAG, DROP, } from '../actions/dragDrop';
import { REMOVE_TARGET } from '../actions/registry';
const without = require('lodash/without');
const initialState = {
    itemType: null,
    item: null,
    sourceId: null,
    targetIds: [],
    dropResult: null,
    didDrop: false,
    isSourcePublic: null,
};
export default function dragOperation(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case BEGIN_DRAG:
            return Object.assign({}, state, { itemType: payload.itemType, item: payload.item, sourceId: payload.sourceId, isSourcePublic: payload.isSourcePublic, dropResult: null, didDrop: false });
        case PUBLISH_DRAG_SOURCE:
            return Object.assign({}, state, { isSourcePublic: true });
        case HOVER:
            return Object.assign({}, state, { targetIds: payload.targetIds });
        case REMOVE_TARGET:
            if (state.targetIds.indexOf(payload.targetId) === -1) {
                return state;
            }
            return Object.assign({}, state, { targetIds: without(state.targetIds, payload.targetId) });
        case DROP:
            return Object.assign({}, state, { dropResult: payload.dropResult, didDrop: true, targetIds: [] });
        case END_DRAG:
            return Object.assign({}, state, { itemType: null, item: null, sourceId: null, dropResult: null, didDrop: false, isSourcePublic: null, targetIds: [] });
        default:
            return state;
    }
}
