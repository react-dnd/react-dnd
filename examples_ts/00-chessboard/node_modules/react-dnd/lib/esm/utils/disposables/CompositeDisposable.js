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
