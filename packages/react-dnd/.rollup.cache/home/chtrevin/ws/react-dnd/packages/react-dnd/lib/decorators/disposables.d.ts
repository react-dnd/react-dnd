import { noop } from '../utils/js_utils';
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
        dispose: typeof noop;
    };
    /**
     * Validates whether the given object is a disposable
     * @param {Object} Object to test whether it has a dispose method
     * @returns {Boolean} true if a disposable object, else false.
     */
    static isDisposable(d: any): boolean;
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
/**
 * Represents a group of disposable resources that are disposed together.
 * @constructor
 */
export declare class CompositeDisposable {
    private isDisposed;
    private disposables;
    constructor(...disposables: Disposable[]);
    /**
     * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
     * @param {Any} item Disposable to add.
     */
    add(item: Disposable): void;
    /**
     * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
     * @param {Any} item Disposable to remove.
     * @returns {Boolean} true if found; false otherwise.
     */
    remove(item: Disposable): boolean;
    /**
     *  Disposes all disposables in the group and removes them from the group but
     *  does not dispose the CompositeDisposable.
     */
    clear(): void;
    /**
     *  Disposes all disposables in the group and removes them from the group.
     */
    dispose(): void;
}
/**
 * Represents a disposable resource whose underlying disposable resource can
 * be replaced by another disposable resource, causing automatic disposal of
 * the previous underlying disposable resource.
 */
export declare class SerialDisposable {
    private isDisposed;
    private current;
    /**
     * Gets the underlying disposable.
     * @returns {Any} the underlying disposable.
     */
    getDisposable(): Disposable | undefined;
    setDisposable(value: Disposable): void;
    /** Performs the task of cleaning up resources. */
    dispose(): void;
}
