import invariant from 'invariant'
import isPlainObject from 'lodash/isPlainObject'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import decorateHandler from './decorateHandler'
import registerTarget from './registerTarget'
import createTargetFactory from './createTargetFactory'
import createTargetMonitor from './createTargetMonitor'
import createTargetConnector from './createTargetConnector'
import isValidType from './utils/isValidType'

export default function DropTarget(type, spec, collect, options = {}) {
	checkDecoratorArguments(
		'DropTarget',
		'type, spec, collect[, options]',
		...arguments, // eslint-disable-line prefer-rest-params
	)
	let getType = type
	if (typeof type !== 'function') {
		invariant(
			isValidType(type, true),
			'Expected "type" provided as the first argument to DropTarget to be ' +
				'a string, an array of strings, or a function that returns either given ' +
				'the current props. Instead, received %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html',
			type,
		)
		getType = () => type
	}
	invariant(
		isPlainObject(spec),
		'Expected "spec" provided as the second argument to DropTarget to be ' +
			'a plain object. Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html',
		spec,
	)
	const createTarget = createTargetFactory(spec)
	invariant(
		typeof collect === 'function',
		'Expected "collect" provided as the third argument to DropTarget to be ' +
			'a function that returns a plain object of props to inject. ' +
			'Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html',
		collect,
	)
	invariant(
		isPlainObject(options),
		'Expected "options" provided as the fourth argument to DropTarget to be ' +
			'a plain object when specified. ' +
			'Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html',
		collect,
	)

	return function decorateTarget(DecoratedComponent) {
		return decorateHandler({
			connectBackend: (backend, targetId) =>
				backend.connectDropTarget(targetId),
			containerDisplayName: 'DropTarget',
			createHandler: createTarget,
			registerHandler: registerTarget,
			createMonitor: createTargetMonitor,
			createConnector: createTargetConnector,
			DecoratedComponent,
			getType,
			collect,
			options,
		})
	}
}
