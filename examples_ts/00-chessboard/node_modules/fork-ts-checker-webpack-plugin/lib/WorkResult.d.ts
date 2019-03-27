import { Message } from './Message';
export declare class WorkResult {
    private workDomain;
    private workResult;
    constructor(workDomain: number[]);
    supports(workName: number): boolean;
    set(workName: number, result: Message): void;
    has(workName: number): boolean;
    get(workName: number): Message;
    hasAll(): boolean;
    clear(): void;
    reduce(reducer: (m1: Message, m2: Message) => Message, initial: Message): Message;
}
