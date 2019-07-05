declare var process: any

import * as React from 'react'
import { DropTarget } from 'dnd-core'
import invariant from 'invariant'
import { DropTargetMonitor } from '../interfaces'
import { isPlainObject } from '../utils/js_utils'
import { DropTargetSpec } from './interfaces'
import { getDecoratedComponent } from './utils'
const ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop']

export interface Target extends DropTarget {
	receiveProps(props: any): void
	receiveMonitor(monitor: any): void
}

class TargetImpl<Props> implements Target {
	private props: Props | null = null

	constructor(
		private spec: DropTargetSpec<Props>,
		private monitor: DropTargetMonitor,
		private ref: React.RefObject<any>,
	) {}

	public receiveProps(props: Props) {
		this.props = props
	}

	public receiveMonitor(monitor: DropTargetMonitor) {
		this.monitor = monitor
	}

	public canDrop(): boolean {
		if (!this.spec.canDrop) {
			return true
		}

		return this.spec.canDrop(this.props as Props, this.monitor)
	}

	public hover() {
		if (!this.spec.hover) {
			return
		}
		this.spec.hover(this.props!, this.monitor, getDecoratedComponent(this.ref))
	}

	public drop() {
		if (!this.spec.drop) {
			return undefined
		}

		const dropResult = this.spec.drop(
			this.props as Props,
			this.monitor,
			this.ref.current,
		)
		if (process.env.NODE_ENV !== 'production') {
			invariant(
				typeof dropResult === 'undefined' || isPlainObject(dropResult),
				'drop() must either return undefined, or an object that represents the drop result. ' +
					'Instead received %s. ' +
					'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target',
				dropResult,
			)
		}
		return dropResult
	}
}

export default function createTargetFactory<Props>(
	spec: DropTargetSpec<Props>,
) {
	Object.keys(spec).forEach(key => {
		invariant(
			ALLOWED_SPEC_METHODS.indexOf(key) > -1,
			'Expected the drop target specification to only have ' +
				'some of the following keys: %s. ' +
				'Instead received a specification with an unexpected "%s" key. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target',
			ALLOWED_SPEC_METHODS.join(', '),
			key,
		)
		invariant(
			typeof (spec as any)[key] === 'function',
			'Expected %s in the drop target specification to be a function. ' +
				'Instead received a specification with %s: %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target',
			key,
			key,
			(spec as any)[key],
		)
	})

	return function createTarget(
		monitor: DropTargetMonitor,
		ref: React.RefObject<any>,
	): Target {
		return new TargetImpl(spec, monitor, ref)
	}
}
