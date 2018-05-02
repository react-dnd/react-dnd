import React, { Component, ComponentClass, StatelessComponent } from 'react'
import invariant from 'invariant'
import isPlainObject from 'lodash/isPlainObject'
import { IBackend, ItemType } from 'dnd-core'
import {
	IDragSourceSpecification,
	DragSourceCollector,
	IDragSourceOptions,
	IDndComponentClass,
} from './interfaces'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import decorateHandler from './decorateHandler'
import registerSource from './registerSource'
import createSourceFactory from './createSourceFactory'
import createSourceMonitor from './createSourceMonitor'
import createSourceConnector from './createSourceConnector'
import isValidType from './utils/isValidType'

export default function DragSource(
	type: ItemType,
	spec: IDragSourceSpecification<any, any>,
	collect: DragSourceCollector<any>,
	options: IDragSourceOptions = {},
) {
	checkDecoratorArguments(
		'DragSource',
		'type, spec, collect[, options]',
		type,
		spec,
		collect,
		options, // eslint-disable-line prefer-rest-params
	)
	let getType: any = type
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

	return function decorateSource<
		Props,
		T extends React.ComponentClass<Props> | React.StatelessComponent<Props>
	>(DecoratedComponent: T): T & IDndComponentClass<Props> {
		return decorateHandler({
			connectBackend: (backend: IBackend, sourceId: string) => {
				backend.connectDragSource(sourceId)
			},
			containerDisplayName: 'DragSource',
			createHandler: createSource,
			registerHandler: registerSource,
			createMonitor: createSourceMonitor,
			createConnector: createSourceConnector,
			DecoratedComponent,
			getType,
			collect,
			options,
		}) as any
	}
}
