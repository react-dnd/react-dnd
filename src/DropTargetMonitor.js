import { CompositeDisposable } from 'disposables';
import createConnectRef from './createConnectRef';

export default class DropTargetMonitor {
  constructor(manager, targetId) {
    this.manager = manager;
    this.targetId = targetId;

    this.disposable = new CompositeDisposable();

    const backend = manager.getBackend();
    const connector = backend.connectDropTarget(targetId);

    Object.keys(connector).forEach(name => {
      const { disposable, ref } = createConnectRef(connector[name]);

      this.disposable.add(disposable);
      this[name] = () => ref;
    });
  }

  canDrop() {
    const monitor = this.manager.getMonitor();
    return monitor.canDropOnTarget(this.targetId);
  }

  isOver(options) {
    const monitor = this.manager.getMonitor();
    return monitor.isOverTarget(this.targetId, options);
  }

  getDisposable() {
    return this.disposable;
  }
}