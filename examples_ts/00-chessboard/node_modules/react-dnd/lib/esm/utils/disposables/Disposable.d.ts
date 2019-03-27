/**
 * Provides a set of static methods for creating Disposables.
 * @param {Function} action Action to run during the first call to dispose.
 * The action is guaranteed to be run at most once.
 */
export declare class Disposable {
    /**
     * Gets the disposable that does nothing when disposed.
     */
    static empty: {
        dispose: any;
    };
    /**
     * Validates whether the given object is a disposable
     * @param {Object} Object to test whether it has a dispose method
     * @returns {Boolean} true if a disposable object, else false.
     */
    static isDisposable(d: any): any;
    static _fixup(result: any): any;
    /**
     * Creates a disposable object that invokes the specified action when disposed.
     * @param {Function} dispose Action to run during the first call to dispose.
     * The action is guaranteed to be run at most once.
     * @return {Disposable} The disposable object that runs the given action upon disposal.
     */
    static create(action: any): Disposable;
    private isDisposed;
    private action;
    constructor(action: any);
    /** Performs the task of cleaning up resources. */
    dispose(): void;
}
