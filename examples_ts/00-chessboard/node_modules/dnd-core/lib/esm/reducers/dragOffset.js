import { INIT_COORDS, BEGIN_DRAG, HOVER, END_DRAG, DROP, } from '../actions/dragDrop';
import { areCoordsEqual } from '../utils/equality';
const initialState = {
    initialSourceClientOffset: null,
    initialClientOffset: null,
    clientOffset: null,
};
export default function dragOffset(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case INIT_COORDS:
        case BEGIN_DRAG:
            return {
                initialSourceClientOffset: payload.sourceClientOffset,
                initialClientOffset: payload.clientOffset,
                clientOffset: payload.clientOffset,
            };
        case HOVER:
            if (areCoordsEqual(state.clientOffset, payload.clientOffset)) {
                return state;
            }
            return Object.assign({}, state, { clientOffset: payload.clientOffset });
        case END_DRAG:
        case DROP:
            return initialState;
        default:
            return state;
    }
}
