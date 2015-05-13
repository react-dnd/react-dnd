import bindConnectorMethod from './bindConnectorMethod';
import { CompositeDisposable } from 'disposables';

export default function bindConnector(connector, handlerId) {
  const compositeDisposable = new CompositeDisposable();
  const handlerConnector = {};

  Object.keys(connector).forEach(key => {
    const { disposable, ref } = bindConnectorMethod(handlerId, connector[key]);
    compositeDisposable.add(disposable);
    handlerConnector[key] = () => ref;
  });

  return {
    disposable: compositeDisposable,
    handlerConnector
  };
}