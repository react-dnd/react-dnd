import { CompositeDisposable } from 'disposables';
import createConnectRef from './createConnectRef';

export default class DragSourceMonitor {
  constructor(manager, sourceId) {
    this.manager = manager;
    this.sourceId = sourceId;

    this.disposable = new CompositeDisposable();

    const backend = manager.getBackend();
    const connector = backend.connectDragSource(sourceId);

    Object.keys(connector).forEach(name => {
      const { disposable, ref } = createConnectRef(connector[name]);

      this.disposable.add(disposable);
      this[name] = () => ref;
    });
  }

  canDrag() {
    const monitor = this.manager.getMonitor();
    return monitor.canDragSource(this.sourceId);
  }

  isDragging() {
    const monitor = this.manager.getMonitor();
    return monitor.isDraggingSource(this.sourceId);
  }

  getDisposable() {
    return this.disposable;
  }
}