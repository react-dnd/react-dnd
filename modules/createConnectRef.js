import shallowEqual from './utils/shallowEqual';
import { Disposable, SerialDisposable } from 'disposables';
import { findDOMNode } from 'react';

export default function createConnectRef(connect) {
  const disposable = new SerialDisposable();

  let currentNode = null;
  let currentOptions = null;

  function ref(nextComponentOrNode, nextOptions) {
    const nextNode = findDOMNode(nextComponentOrNode);
    if (nextNode === currentNode && shallowEqual(currentOptions, nextOptions)) {
      return;
    }

    currentNode = nextNode;
    currentOptions = nextOptions;

    if (!nextNode) {
      disposable.setDisposable(null);
      return;
    }

    const currentDispose = connect(nextNode, nextOptions);
    disposable.setDisposable(new Disposable(currentDispose));
  }

  return { disposable, ref };
}