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
