declare var require: any
import * as React from 'react'
import { SourceType, DragDropManager } from 'dnd-core'
import { DndOptions } from 'react-dnd'
import { isPlainObject } from 'react-dnd/lib/internals'
import {
	DndComponentEnhancer,
	DragSourceSpec,
	DragSourceCollector,
} from './interfaces'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import decorateHandler from './decorateHandler'
import {
	registerSource,
	DragSourceMonitorImpl,
	SourceConnector,
	isValidType,
} from 'react-dnd/lib/internals'
import createSourceFactory from './createSourceFactory'
const invariant = require('invariant')

/**
 * Decorates a component as a dragsource
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */
export function DragSource<RequiredProps, CollectedProps = {}, DragObject = {}>(
	type: SourceType | ((props: RequiredProps) => SourceType),
	spec: DragSourceSpec<RequiredProps, DragObject>,
	collect: DragSourceCollector<CollectedProps, RequiredProps>,
	options: DndOptions<RequiredProps> = {},
): DndComponentEnhancer<CollectedProps> {
	checkDecoratorArguments(
		'DragSource',
		'type, spec, collect[, options]',
		type,
		spec,
		collect,
		options,
	)
	let getType: (props: RequiredProps) => SourceType = type as ((
		props: RequiredProps,
	) => SourceType)
	if (typeof type !== 'function') {
		invariant(
			isValidType(type),
			'Expected "type" provided as the first argument to DragSource to be ' +
				'a string, or a function that returns a string given the current props. ' +
				'Instead, received %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',
			type,
		)
		getType = () => type
	}
	invariant(
		isPlainObject(spec),
		'Expected "spec" provided as the second argument to DragSource to be ' +
			'a plain object. Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',
		spec,
	)
	const createSource = createSourceFactory(spec)
	invariant(
		typeof collect === 'function',
		'Expected "collect" provided as the third argument to DragSource to be ' +
			'a function that returns a plain object of props to inject. ' +
			'Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',
		collect,
	)
	invariant(
		isPlainObject(options),
		'Expected "options" provided as the fourth argument to DragSource to be ' +
			'a plain object when specified. ' +
			'Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',
		collect,
	)

	return (function decorateSource<
		ComponentType extends React.ComponentType<RequiredProps & CollectedProps>
	>(DecoratedComponent: ComponentType) {
		return decorateHandler<RequiredProps, CollectedProps, SourceType>({
			containerDisplayName: 'DragSource',
			createHandler: createSource as any,
			registerHandler: registerSource,
			createConnector: (backend: any) => new SourceConnector(backend),
			createMonitor: (manager: DragDropManager<any>) =>
				new DragSourceMonitorImpl(manager),
			DecoratedComponent,
			getType,
			collect,
			options,
		})
	} as any) as DndComponentEnhancer<CollectedProps>
}
