declare var process: any
import * as React from 'react'
import invariant from 'invariant'
import { DragSource, DragDropMonitor } from 'dnd-core'
import { DragSourceMonitor } from '../interfaces'
import { isPlainObject } from '../utils/js_utils'
import { DragSourceSpec } from './interfaces'
import { getDecoratedComponent } from './utils'

const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag']
const REQUIRED_SPEC_METHODS = ['beginDrag']

export interface Source extends DragSource {
	receiveProps(props: any): void
}

class SourceImpl<Props> implements Source {
	private props: Props | null = null

	constructor(
		private spec: DragSourceSpec<Props, any>,
		private monitor: DragSourceMonitor,
		private ref: React.RefObject<any>,
	) {}

	public receiveProps(props: Props) {
		this.props = props
	}

	public canDrag() {
		if (!this.props) {
			return false
		}
		if (!this.spec.canDrag) {
			return true
		}

		return this.spec.canDrag(this.props, this.monitor)
	}

	public isDragging(globalMonitor: DragDropMonitor, sourceId: string) {
		if (!this.props) {
			return false
		}
		if (!this.spec.isDragging) {
			return sourceId === globalMonitor.getSourceId()
		}

		return this.spec.isDragging(this.props, this.monitor)
	}

	public beginDrag = () => {
		if (!this.props) {
			return
		}

		const item = this.spec.beginDrag(this.props, this.monitor, this.ref.current)
		if (process.env.NODE_ENV !== 'production') {
			invariant(
				isPlainObject(item),
				'beginDrag() must return a plain object that represents the dragged item. ' +
					'Instead received %s. ' +
					'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',
				item,
			)
		}
		return item
	}

	public endDrag() {
		if (!this.props) {
			return
		}
		if (!this.spec.endDrag) {
			return
		}

		this.spec.endDrag(this.props, this.monitor, getDecoratedComponent(this.ref))
	}
}

export default function createSourceFactory<Props, DragObject = {}>(
	spec: DragSourceSpec<Props, DragObject>,
) {
	Object.keys(spec).forEach(key => {
		invariant(
			ALLOWED_SPEC_METHODS.indexOf(key) > -1,
			'Expected the drag source specification to only have ' +
				'some of the following keys: %s. ' +
				'Instead received a specification with an unexpected "%s" key. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',
			ALLOWED_SPEC_METHODS.join(', '),
			key,
		)
		invariant(
			typeof (spec as any)[key] === 'function',
			'Expected %s in the drag source specification to be a function. ' +
				'Instead received a specification with %s: %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',
			key,
			key,
			(spec as any)[key],
		)
	})
	REQUIRED_SPEC_METHODS.forEach(key => {
		invariant(
			typeof (spec as any)[key] === 'function',
			'Expected %s in the drag source specification to be a function. ' +
				'Instead received a specification with %s: %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',
			key,
			key,
			(spec as any)[key],
		)
	})

	return function createSource(
		monitor: DragSourceMonitor,
		ref: React.RefObject<any>,
	) {
		return new SourceImpl(spec, monitor, ref) as Source
	}
}
