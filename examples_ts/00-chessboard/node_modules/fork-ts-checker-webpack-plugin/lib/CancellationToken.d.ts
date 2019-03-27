import * as ts from 'typescript';
interface CancellationTokenData {
    isCancelled: boolean;
    cancellationFileName: string;
}
export declare class CancellationToken {
    private typescript;
    private isCancelled;
    private cancellationFileName;
    private lastCancellationCheckTime;
    constructor(typescript: typeof ts, cancellationFileName?: string, isCancelled?: boolean);
    static createFromJSON(typescript: typeof ts, json: CancellationTokenData): CancellationToken;
    toJSON(): {
        cancellationFileName: string;
        isCancelled: boolean;
    };
    getCancellationFilePath(): string;
    isCancellationRequested(): boolean;
    throwIfCancellationRequested(): void;
    requestCancellation(): void;
    cleanupCancellation(): void;
}
export {};
