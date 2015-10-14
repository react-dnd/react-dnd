import shallowEqual from './utils/shallowEqual';
import cloneWithRef from './utils/cloneWithRef';
import { Disposable, SerialDisposable } from 'disposables';
import { isValidElement } from 'react';

export default function bindConnectorMethod(handlerId, connect) {
  const disposable = new SerialDisposable();

  let currentNode = null;
  let currentOptions = null;

  function ref(nextWhatever, nextOptions) {
    // If passed a ReactElement, clone it and attach this function as a ref.
    // This helps us achieve a neat API where user doesn't even know that refs
    // are being used under the hood.
    if (isValidElement(nextWhatever)) {
      // Custom components can no longer be wrapped directly in React DnD 2.0
      // so that we don't need to depend on findDOMNode() from react-dom.
      if (typeof nextWhatever.type !== 'string') {
        const displayName = nextWhatever.type.displayName ||
          nextWhatever.type.name ||
          'the component';
        throw new Error(
          `Only native element nodes can now be passed to ${connect.name}(). ` +
          `You can either wrap ${displayName} into a <div>, or turn it into a ` +
          `drag source or a drop target itself.`
        );
      }

      const nextElement = nextWhatever;
      return cloneWithRef(nextElement, inst => ref(inst, nextOptions));
    }

    // At this point we can only receive DOM nodes.
    const nextNode = nextWhatever;

    // If nothing changed, bail out of re-connecting the node to the backend.
    if (nextNode === currentNode && shallowEqual(currentOptions, nextOptions)) {
      return;
    }

    currentNode = nextNode;
    currentOptions = nextOptions;

    if (!nextNode) {
      disposable.setDisposable(null);
      return;
    }

    // Re-connect the node to the backend.
    const currentDispose = connect(handlerId, nextNode, nextOptions);
    disposable.setDisposable(new Disposable(currentDispose));
  }

  return {
    ref,
    disposable
  };
}