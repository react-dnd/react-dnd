import * as React from 'react'
import { TargetType, DragDropManager } from 'dnd-core'
import invariant from 'invariant'
import { DndOptions } from '../interfaces'
import { isPlainObject } from '../utils/js_utils'
import { registerTarget } from '../common/registration'
import { isValidType } from '../utils/isValidType'
import { TargetConnector } from '../common/TargetConnector'
import { DropTargetMonitorImpl } from '../common/DropTargetMonitorImpl'
import {
	DropTargetSpec,
	DropTargetCollector,
	DndComponentEnhancer,
	DndComponent,
} from './interfaces'
import { checkDecoratorArguments } from './utils'
import decorateHandler from './decorateHandler'
import createTargetFactory from './createTargetFactory'

export function DropTarget<RequiredProps, CollectedProps = {}>(
	type: TargetType | ((props: RequiredProps) => TargetType),
	spec: DropTargetSpec<RequiredProps>,
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
	let getType: (props: RequiredProps) => TargetType = type as ((
		props: RequiredProps,
	) => TargetType)
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

	return (function decorateTarget<
		ComponentType extends React.ComponentType<RequiredProps & CollectedProps>
	>(DecoratedComponent: ComponentType): DndComponent<RequiredProps> {
		return decorateHandler<RequiredProps, CollectedProps, TargetType>({
			containerDisplayName: 'DropTarget',
			createHandler: createTarget as any,
			registerHandler: registerTarget,
			createMonitor: (manager: DragDropManager<any>) =>
				new DropTargetMonitorImpl(manager),
			createConnector: (backend: any) => new TargetConnector(backend),
			DecoratedComponent,
			getType,
			collect,
			options,
		})
	} as any) as DndComponentEnhancer<CollectedProps>
}
