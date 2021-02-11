import { isFunction, noop } from '../utils/js_utils';
/**
 * Provides a set of static methods for creating Disposables.
 * @param {Function} action Action to run during the first call to dispose.
 * The action is guaranteed to be run at most once.
 */
export class Disposable {
    constructor(action) {
        this.isDisposed = false;
        this.action = isFunction(action) ? action : noop;
    }
    /**
     * Validates whether the given object is a disposable
     * @param {Object} Object to test whether it has a dispose method
     * @returns {Boolean} true if a disposable object, else false.
     */
    static isDisposable(d) {
        return Boolean(d && isFunction(d.dispose));
    }
    static _fixup(result) {
        return Disposable.isDisposable(result) ? result : Disposable.empty;
    }
    /**
     * Creates a disposable object that invokes the specified action when disposed.
     * @param {Function} dispose Action to run during the first call to dispose.
     * The action is guaranteed to be run at most once.
     * @return {Disposable} The disposable object that runs the given action upon disposal.
     */
    static create(action) {
        return new Disposable(action);
    }
    /** Performs the task of cleaning up resources. */
    dispose() {
        if (!this.isDisposed) {
            this.action();
            this.isDisposed = true;
        }
    }
}
/**
 * Gets the disposable that does nothing when disposed.
 */
Disposable.empty = { dispose: noop };
/**
 * Represents a group of disposable resources that are disposed together.
 * @constructor
 */
export class CompositeDisposable {
    constructor(...disposables) {
        this.isDisposed = false;
        this.disposables = disposables;
    }
    /**
     * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
     * @param {Any} item Disposable to add.
     */
    add(item) {
        if (this.isDisposed) {
            item.dispose();
        }
        else {
            this.disposables.push(item);
        }
    }
    /**
     * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
     * @param {Any} item Disposable to remove.
     * @returns {Boolean} true if found; false otherwise.
     */
    remove(item) {
        let shouldDispose = false;
        if (!this.isDisposed) {
            const idx = this.disposables.indexOf(item);
            if (idx !== -1) {
                shouldDispose = true;
                this.disposables.splice(idx, 1);
                item.dispose();
            }
        }
        return shouldDispose;
    }
    /**
     *  Disposes all disposables in the group and removes them from the group but
     *  does not dispose the CompositeDisposable.
     */
    clear() {
        if (!this.isDisposed) {
            const len = this.disposables.length;
            const currentDisposables = new Array(len);
            for (let i = 0; i < len; i++) {
                currentDisposables[i] = this.disposables[i];
            }
            this.disposables = [];
            for (let i = 0; i < len; i++) {
                currentDisposables[i].dispose();
            }
        }
    }
    /**
     *  Disposes all disposables in the group and removes them from the group.
     */
    dispose() {
        if (!this.isDisposed) {
            this.isDisposed = true;
            const len = this.disposables.length;
            const currentDisposables = new Array(len);
            for (let i = 0; i < len; i++) {
                currentDisposables[i] = this.disposables[i];
            }
            this.disposables = [];
            for (let i = 0; i < len; i++) {
                currentDisposables[i].dispose();
            }
        }
    }
}
/**
 * Represents a disposable resource whose underlying disposable resource can
 * be replaced by another disposable resource, causing automatic disposal of
 * the previous underlying disposable resource.
 */
export class SerialDisposable {
    constructor() {
        this.isDisposed = false;
    }
    /**
     * Gets the underlying disposable.
     * @returns {Any} the underlying disposable.
     */
    getDisposable() {
        return this.current;
    }
    setDisposable(value) {
        const shouldDispose = this.isDisposed;
        if (!shouldDispose) {
            const old = this.current;
            this.current = value;
            if (old) {
                old.dispose();
            }
        }
        if (shouldDispose && value) {
            value.dispose();
        }
    }
    /** Performs the task of cleaning up resources. */
    dispose() {
        if (!this.isDisposed) {
            this.isDisposed = true;
            const old = this.current;
            this.current = undefined;
            if (old) {
                old.dispose();
            }
        }
    }
}
//# sourceMappingURL=disposables.js.map