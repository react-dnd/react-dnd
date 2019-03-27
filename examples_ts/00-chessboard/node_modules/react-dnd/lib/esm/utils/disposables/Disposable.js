const isFunction = require('lodash/isFunction');
const noop = require('lodash/noop');
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
        return d && isFunction(d.dispose);
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
