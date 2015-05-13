import React, { Component, PropTypes } from 'react';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import invariant from 'invariant';
import isPlainObject from 'lodash/lang/isPlainObject';
import checkDecoratorArguments from './utils/checkDecoratorArguments';
import wrapComponent from './wrapComponent';
import registerTarget from './registerTarget';
import createTargetFactory from './createTargetFactory';
import createTargetMonitor from './createTargetMonitor';
import createTargetConnector from './createTargetConnector';
import isValidType from './utils/isValidType';

export default function decorateTarget(type, spec, collect, options = {}) {
  checkDecoratorArguments('DropTarget', 'type, spec, collect[, options]', ...arguments);
  let getType = type;
  if (typeof type !== 'function') {
    invariant(
      isValidType(type, true),
      'Expected "type" provided as the first argument to DropTarget to be ' +
      'a string, an array of strings, or a function that returns either given ' +
      'the current props. Instead, received %s.',
      type
    );
    getType = () => type;
  }
  invariant(
    isPlainObject(spec),
    'Expected "spec" provided as the second argument to DropTarget to be ' +
    'a plain object. Instead, received %s.',
    spec
  );
  const createTarget = createTargetFactory(spec);
  invariant(
    typeof collect === 'function',
    'Expected "collect" provided as the third argument to DropTarget to be ' +
    'a function that returns a plain object of props to inject. ' +
    'Instead, received %s.',
    collect
  );
  invariant(
    isPlainObject(options),
    'Expected "options" provided as the fourth argument to DropTarget to be ' +
    'a plain object when specified. ' +
    'Instead, received %s.',
    collect
  );

  return function wrapTarget(DecoratedComponent) {
    return wrapComponent({
      connectBackend: (backend, targetId) => backend.connectDropTarget(targetId),
      containerDisplayName: 'DropTarget',
      createHandler: createTarget,
      registerHandler: registerTarget,
      createMonitor: createTargetMonitor,
      createConnector: createTargetConnector,
      DecoratedComponent,
      getType,
      collect,
      options
    });
  };
}