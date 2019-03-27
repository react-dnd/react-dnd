import { Disposable } from './Disposable';
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
