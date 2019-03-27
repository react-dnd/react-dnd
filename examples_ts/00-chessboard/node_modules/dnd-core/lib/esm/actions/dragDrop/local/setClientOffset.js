import { INIT_COORDS } from '../types';
export function setClientOffset(clientOffset, sourceClientOffset) {
    return {
        type: INIT_COORDS,
        payload: {
            sourceClientOffset: sourceClientOffset || null,
            clientOffset: clientOffset || null,
        },
    };
}
