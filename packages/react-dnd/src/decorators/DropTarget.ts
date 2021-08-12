import { ComponentType as RComponentType } from 'react'
import { TargetType, DragDropManager } from 'dnd-core'
import { invariant } from '@react-dnd/invariant'
import {
	TargetConnector,
	DropTargetMonitorImpl,
	registerTarget,
} from '../internals'
import { isPlainObject, isValidType } from './utils'
import {
	DndOptions,
	DropTargetSpec,
	DropTargetCollector,
	DndComponentEnhancer,
	DndComponent,
} from './types'
import { checkDecoratorArguments } from './utils'
import { decorateHandler } from './decorateHandler'
import { createTargetFactory } from './createTargetFactory'

/**
 * @param type The accepted target type
 * @param spec The DropTarget specification
 * @param collect The props collector function
 * @param options Options
 */
export function DropTarget<
	RequiredProps,
	CollectedProps = any,
	DragObject = any,
	DropResult = any,
>(
	type: TargetType | ((props: RequiredProps) => TargetType),
	spec: DropTargetSpec<RequiredProps, DragObject, DropResult>,
	collect: DropTargetCollector<CollectedProps, RequiredProps>,
	options: DndOptions<RequiredProps> = {},
): DndComponentEnhancer<CollectedProps> {
	checkDecoratorArguments(
		'DropTarget',
		'type, spec, collect[, options]',
		type,
		spec,
		collect,
		options,
	)
	let getType: (props: RequiredProps) => TargetType = type as (
		props: RequiredProps,
	) => TargetType
	if (typeof type !== 'function') {
		invariant(
			isValidType(type, true),
			'Expected "type" provided as the first argument to DropTarget to be ' +
				'a string, an array of strings, or a function that returns either given ' +
				'the current props. Instead, received %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target',
			type,
		)
		getType = () => type
	}
	invariant(
		isPlainObject(spec),
		'Expected "spec" provided as the second argument to DropTarget to be ' +
			'a plain object. Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target',
		spec,
	)
	const createTarget = createTargetFactory(spec)
	invariant(
		typeof collect === 'function',
		'Expected "collect" provided as the third argument to DropTarget to be ' +
			'a function that returns a plain object of props to inject. ' +
			'Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target',
		collect,
	)
	invariant(
		isPlainObject(options),
		'Expected "options" provided as the fourth argument to DropTarget to be ' +
			'a plain object when specified. ' +
			'Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target',
		collect,
	)

	return function decorateTarget<
		ComponentType extends RComponentType<RequiredProps & CollectedProps>,
	>(DecoratedComponent: ComponentType): DndComponent<RequiredProps> {
		return decorateHandler<RequiredProps, CollectedProps, TargetType>({
			containerDisplayName: 'DropTarget',
			createHandler: createTarget as any,
			registerHandler: registerTarget,
			createMonitor: (manager: DragDropManager) =>
				new DropTargetMonitorImpl(manager),
			createConnector: (backend: any) => new TargetConnector(backend),
			DecoratedComponent,
			getType,
			collect,
			options,
		})
	} as any as DndComponentEnhancer<CollectedProps>
}
