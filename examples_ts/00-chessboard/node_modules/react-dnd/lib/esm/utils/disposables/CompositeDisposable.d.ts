import { Disposable } from './Disposable';
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
