import { Disposable } from './Disposable'

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
