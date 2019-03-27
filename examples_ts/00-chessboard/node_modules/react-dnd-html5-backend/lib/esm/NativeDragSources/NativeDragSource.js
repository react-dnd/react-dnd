export class NativeDragSource {
    constructor(config) {
        this.config = config;
        this.item = {};
        Object.keys(this.config.exposeProperties).forEach(property => {
            Object.defineProperty(this.item, property, {
                configurable: true,
                enumerable: true,
                get() {
                    // tslint:disable-next-line no-console
                    console.warn(`Browser doesn't allow reading "${property}" until the drop event.`);
                    return null;
                },
            });
        });
    }
    mutateItemByReadingDataTransfer(dataTransfer) {
        const newProperties = {};
        if (dataTransfer) {
            Object.keys(this.config.exposeProperties).forEach(property => {
                newProperties[property] = {
                    value: this.config.exposeProperties[property](dataTransfer, this.config.matchesTypes),
                };
            });
        }
        Object.defineProperties(this.item, newProperties);
    }
    canDrag() {
        return true;
    }
    beginDrag() {
        return this.item;
    }
    isDragging(monitor, handle) {
        return handle === monitor.getSourceId();
    }
    endDrag() {
        // empty
    }
}
