export declare class WorkSet<T> {
    private workDomain;
    private workNumber;
    private workDivision;
    private workSize;
    private workBegin;
    private workEnd;
    constructor(workDomain: ReadonlyArray<T>, workNumber: number, workDivision: number);
    forEach(callback: (workDomainItem: T, index: number) => void): void;
}
