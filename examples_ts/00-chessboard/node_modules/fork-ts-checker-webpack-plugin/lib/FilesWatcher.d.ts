export declare class FilesWatcher {
    private watchPaths;
    private watchExtensions;
    private watchers;
    private listeners;
    constructor(watchPaths: string[], watchExtensions: string[]);
    isFileSupported(filePath: string): boolean;
    watch(): void;
    isWatchingFile(filePath: string): boolean;
    isWatching(): boolean;
    on(event: string, listener: Function): void;
    off(event: string, listener: Function): void;
}
