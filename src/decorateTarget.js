import React, { Component, PropTypes } from 'react';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import invariant from 'invariant';
import checkDecoratorArguments from './utils/checkDecoratorArguments';
import wrapComponent from './wrapComponent';
import registerTarget from './registerTarget';
import createTargetFactory from './createTargetFactory';
import createTargetMonitor from './createTargetMonitor';
import isValidType from './utils/isValidType';

export default function decorateTarget(getType, spec, collect) {
  checkDecoratorArguments('DragTarget', ...arguments);
  if (typeof getType !== 'function') {
    invariant(
      isValidType(getType, true),
      'Expected the first argument to DragTarget call to be a string, ' +
      'an array of strings, or a function that returns either given ' +
      'the current props. Instead, received %s.',
      getType
    );
    const type = getType;
    getType = () => type;
  }
  invariant(
    typeof collect === 'function',
    'Expected the third argument to DragTarget call to be a function ' +
    'that returns a plain object of props to inject. ' +
    'Instead, received %s.',
    collect
  );

  const createTarget = createTargetFactory(spec);
  return function wrapTarget(DecoratedComponent) {
    return wrapComponent({
      wrapDisplayName: displayName => `DragTarget(${displayName})`,
      connectBackend: (backend, targetId) => backend.connectDropTarget(targetId),
      createHandler: createTarget,
      registerHandler: registerTarget,
      createMonitor: createTargetMonitor,
      DecoratedComponent,
      getType,
      collect
    });
  };
}