import { isFunction, noop } from '../utils/js_utils'

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

	public constructor(action: any) {
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

/**
 * Represents a group of disposable resources that are disposed together.
 * @constructor
 */
export class CompositeDisposable {
	private isDisposed = false
	private disposables: Disposable[]

	public constructor(...disposables: Disposable[]) {
		this.disposables = disposables
	}

	/**
	 * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
	 * @param {Any} item Disposable to add.
	 */
	public add(item: Disposable) {
		if (this.isDisposed) {
			item.dispose()
		} else {
			this.disposables.push(item)
		}
	}

	/**
	 * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
	 * @param {Any} item Disposable to remove.
	 * @returns {Boolean} true if found; false otherwise.
	 */
	public remove(item: Disposable) {
		let shouldDispose = false
		if (!this.isDisposed) {
			const idx = this.disposables.indexOf(item)
			if (idx !== -1) {
				shouldDispose = true
				this.disposables.splice(idx, 1)
				item.dispose()
			}
		}
		return shouldDispose
	}

	/**
	 *  Disposes all disposables in the group and removes them from the group but
	 *  does not dispose the CompositeDisposable.
	 */
	public clear() {
		if (!this.isDisposed) {
			const len = this.disposables.length
			const currentDisposables = new Array(len)
			for (let i = 0; i < len; i++) {
				currentDisposables[i] = this.disposables[i]
			}
			this.disposables = []

			for (let i = 0; i < len; i++) {
				currentDisposables[i].dispose()
			}
		}
	}

	/**
	 *  Disposes all disposables in the group and removes them from the group.
	 */
	public dispose() {
		if (!this.isDisposed) {
			this.isDisposed = true
			const len = this.disposables.length
			const currentDisposables = new Array(len)
			for (let i = 0; i < len; i++) {
				currentDisposables[i] = this.disposables[i]
			}
			this.disposables = []

			for (let i = 0; i < len; i++) {
				currentDisposables[i].dispose()
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
	private isDisposed = false
	private current: Disposable | undefined

	/**
	 * Gets the underlying disposable.
	 * @returns {Any} the underlying disposable.
	 */
	public getDisposable() {
		return this.current
	}

	public setDisposable(value: Disposable) {
		const shouldDispose = this.isDisposed
		if (!shouldDispose) {
			const old = this.current
			this.current = value
			if (old) {
				old.dispose()
			}
		}

		if (shouldDispose && value) {
			value.dispose()
		}
	}

	/** Performs the task of cleaning up resources. */
	public dispose() {
		if (!this.isDisposed) {
			this.isDisposed = true
			const old = this.current
			this.current = undefined
			if (old) {
				old.dispose()
			}
		}
	}
}
