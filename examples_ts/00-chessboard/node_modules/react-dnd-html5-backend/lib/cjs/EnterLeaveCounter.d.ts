declare type NodePredicate = (node: any) => boolean;
export default class EnterLeaveCounter {
    private entered;
    private isNodeInDocument;
    constructor(isNodeInDocument: NodePredicate);
    enter(enteringNode: any): boolean;
    leave(leavingNode: any): boolean;
    reset(): void;
}
export {};
