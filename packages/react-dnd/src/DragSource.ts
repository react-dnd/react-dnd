import React, { Component, ComponentClass, StatelessComponent } from 'react'
import invariant from 'invariant'
import isPlainObject from 'lodash/isPlainObject'
import { Backend, SourceType } from 'dnd-core'
import {
	DragSourceSpec,
	DragSourceCollector,
	DndOptions,
	DndComponentClass,
	DragSourceMonitor,
} from './interfaces'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import decorateHandler from './decorateHandler'
import registerSource from './registerSource'
import createSourceFactory from './createSourceFactory'
import createSourceMonitor from './createSourceMonitor'
import createSourceConnector from './createSourceConnector'
import isValidType from './utils/isValidType'

/**
 * Decorates a component as a dragsource
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD optinos
 */
export default function DragSource<
	P,
	S,
	TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>,
	CollectedProps,
	DragObject
>(
	type: SourceType | ((props: P) => SourceType),
	spec: DragSourceSpec<P, S, TargetComponent, DragObject>,
	collect: DragSourceCollector<CollectedProps>,
	options: DndOptions<P> = {},
) {
	checkDecoratorArguments(
		'DragSource',
		'type, spec, collect[, options]',
		type,
		spec,
		collect,
		options,
	)
	let getType: ((props: P) => SourceType) = type as ((props: P) => SourceType)
	if (typeof type !== 'function') {
		invariant(
			isValidType(type),
			'Expected "type" provided as the first argument to DragSource to be ' +
				'a string, or a function that returns a string given the current props. ' +
				'Instead, received %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
			type,
		)
		getType = () => type
	}
	invariant(
		isPlainObject(spec),
		'Expected "spec" provided as the second argument to DragSource to be ' +
			'a plain object. Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
		spec,
	)
	const createSource = createSourceFactory(spec)
	invariant(
		typeof collect === 'function',
		'Expected "collect" provided as the third argument to DragSource to be ' +
			'a function that returns a plain object of props to inject. ' +
			'Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
		collect,
	)
	invariant(
		isPlainObject(options),
		'Expected "options" provided as the fourth argument to DragSource to be ' +
			'a plain object when specified. ' +
			'Instead, received %s. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
		collect,
	)

	return function decorateSource<TargetClass extends React.ComponentClass<P>>(
		DecoratedComponent: TargetClass,
	): TargetClass & DndComponentClass<P, TargetComponent, TargetClass> {
		return decorateHandler<P, S, TargetComponent, TargetClass, SourceType>({
			containerDisplayName: 'DragSource',
			createHandler: createSource,
			registerHandler: registerSource,
			createMonitor: createSourceMonitor,
			createConnector: createSourceConnector,
			DecoratedComponent,
			getType,
			collect,
			options,
		})
	}
}
