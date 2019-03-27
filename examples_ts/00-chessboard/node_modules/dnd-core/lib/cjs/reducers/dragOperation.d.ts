import { Identifier, Action } from '../interfaces';
export interface State {
    itemType: Identifier | Identifier[] | null;
    item: any;
    sourceId: string | null;
    targetIds: string[];
    dropResult: any;
    didDrop: boolean;
    isSourcePublic: boolean | null;
}
export default function dragOperation(state: State | undefined, action: Action<{
    itemType: Identifier | Identifier[];
    item: any;
    sourceId: string;
    targetId: string;
    targetIds: string[];
    isSourcePublic: boolean;
    dropResult: any;
}>): {
    targetIds: any;
    itemType: string | symbol | (string | symbol)[] | null;
    item: any;
    sourceId: string | null;
    dropResult: any;
    didDrop: boolean;
    isSourcePublic: boolean | null;
};
