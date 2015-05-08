import React, { Component, PropTypes } from 'react';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import invariant from 'invariant';
import checkDecoratorArguments from './utils/checkDecoratorArguments';
import wrapComponent from './wrapComponent';
import registerSource from './registerSource';
import createSourceFactory from './createSourceFactory';
import createSourceMonitor from './createSourceMonitor';
import isValidType from './utils/isValidType';

export default function decorateSource(getType, spec, collect) {
  checkDecoratorArguments('DragSource', ...arguments);
  if (typeof getType !== 'function') {
    invariant(
      isValidType(getType),
      'Expected the first argument to DragSource call to be a string ' +
      'or a function that returns either given the current props. ' +
      'Instead, received %s.',
      getType
    );
    const type = getType;
    getType = () => type;
  }
  invariant(
    typeof collect === 'function',
    'Expected the third argument to DragSource call to be a function ' +
    'that returns a plain object of props to inject. ' +
    'Instead, received %s.',
    collect
  );
  if (typeof getType === 'string') {
    const type = getType;
    getType = () => type;
  }

  return function wrapSource(DecoratedComponent) {
    return wrapComponent({
      wrapDisplayName: displayName => `DragSource(${displayName})`,
      connectBackend: (backend, sourceId) => backend.connectDragSource(sourceId),
      createHandler: createSourceFactory(spec),
      registerHandler: registerSource,
      createMonitor: createSourceMonitor,
      DecoratedComponent,
      getType,
      collect
    });
  };
}