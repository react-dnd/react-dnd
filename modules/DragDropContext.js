import { PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';

/**
 * We shouldn't need this in React 0.14.
 * For now, I need something working!
 */
export default function(backends) {
  const keys = Object.keys(backends);

  const context = {};
  const childContextTypes = {};

  keys.forEach(key => {
    childContextTypes[key] = PropTypes.object.isRequired;
    context[key] = new DragDropManager(backends[key]);
  });

  return {
    childContextTypes: childContextTypes,

    getChildContext() {
      return context;
    }
  };
};