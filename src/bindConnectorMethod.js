import shallowEqual from './utils/shallowEqual';
import cloneWithRef from './utils/cloneWithRef';
import { Disposable, SerialDisposable } from 'disposables';
import { isValidElement } from 'react';
import {findDOMNode} from 'react-dom';

export default function bindConnectorMethod(handlerId, connect) {
  const disposable = new SerialDisposable();

  let currentNode = null;
  let currentOptions = null;

  function ref(nextWhatever, nextOptions) {
    // If passed a ReactElement, clone it and attach this function as a ref.
    // This helps us achieve a neat API where user doesn't even know that refs
    // are being used under the hood.
    if (isValidElement(nextWhatever)) {
      const nextElement = nextWhatever;
      return cloneWithRef(nextElement, inst => ref(inst, nextOptions));
    }

    // At this point we can only receive components or DOM nodes.
    const nextNode = findDOMNode(nextWhatever);

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