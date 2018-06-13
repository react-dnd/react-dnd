const isFunction = require('lodash/isFunction')
const noop = require('lodash/noop')

/**
 * Provides a set of static methods for creating Disposables.
 * @param {Function} action Action to run during the first call to dispose.
 * The action is guaranteed to be run at most once.
 */
export class Disposable {
	/**
	 * Gets the disposable that does nothing when disposed.
	 */
	public static empty = { dispose: noop }

	/**
	 * Validates whether the given object is a disposable
	 * @param {Object} Object to test whether it has a dispose method
	 * @returns {Boolean} true if a disposable object, else false.
	 */
	public static isDisposable(d: any) {
		return d && isFunction(d.dispose)
	}

	public static _fixup(result: any) {
		return Disposable.isDisposable(result) ? result : Disposable.empty
	}

	/**
	 * Creates a disposable object that invokes the specified action when disposed.
	 * @param {Function} dispose Action to run during the first call to dispose.
	 * The action is guaranteed to be run at most once.
	 * @return {Disposable} The disposable object that runs the given action upon disposal.
	 */
	public static create(action: any) {
		return new Disposable(action)
	}

	private isDisposed = false
	private action: () => void

	constructor(action: any) {
		this.action = isFunction(action) ? action : noop
	}

	/** Performs the task of cleaning up resources. */
	public dispose() {
		if (!this.isDisposed) {
			this.action()
			this.isDisposed = true
		}
	}
}
