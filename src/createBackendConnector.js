import createConnectRef from './createConnectRef';
import { CompositeDisposable, Disposable } from 'disposables';

export default function createBackendConnector(handlerId, connectBackend, manager) {
  const backend = manager.getBackend();
  const backendConnector = connectBackend(backend, handlerId);

  const connector = {};
  const compositeDisposable = new CompositeDisposable();

  Object.keys(backendConnector).forEach(key => {
    const { disposable, ref } = createConnectRef(backendConnector[key]);
    compositeDisposable.add(disposable);
    connector[key] = () => ref;
  });

  return {
    disposable: compositeDisposable,
    connector
  };
}