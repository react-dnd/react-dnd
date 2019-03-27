import { XYCoord } from '../../../interfaces';
export declare function setClientOffset(clientOffset: XYCoord | null | undefined, sourceClientOffset?: XYCoord | null | undefined): {
    type: string;
    payload: {
        sourceClientOffset: XYCoord | null;
        clientOffset: XYCoord | null;
    };
};
