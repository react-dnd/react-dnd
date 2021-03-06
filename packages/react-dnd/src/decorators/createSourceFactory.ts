declare const process: any
import { RefObject } from 'react'
import { invariant } from '@react-dnd/invariant'
import { DragSource, DragDropMonitor } from 'dnd-core'
import { DragSourceMonitor } from '../types'
import { isPlainObject, getDecoratedComponent } from './utils'
import { DragSourceSpec } from './types'

const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag']
const REQUIRED_SPEC_METHODS = ['beginDrag']

export interface Source extends DragSource {
	receiveProps(props: any): void
}

class SourceImpl<Props, DragObject, DropResult> implements Source {
	private props: Props | null = null
	private spec: DragSourceSpec<Props, DragObject, DropResult>
	private monitor: DragSourceMonitor<DragObject, DropResult>
	private ref: RefObject<any>

	public constructor(
		spec: DragSourceSpec<Props, DragObject, DropResult>,
		monitor: DragSourceMonitor<DragObject, DropResult>,
		ref: RefObject<any>,
	) {
		this.spec = spec
		this.monitor = monitor
		this.ref = ref
	}

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

export function createSourceFactory<Props, DragObject, DropResult>(
	spec: DragSourceSpec<Props, DragObject, DropResult>,
) {
	Object.keys(spec).forEach((key) => {
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
	REQUIRED_SPEC_METHODS.forEach((key) => {
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
		monitor: DragSourceMonitor<DragObject, DropResult>,
		ref: RefObject<any>,
	) {
		return new SourceImpl(spec, monitor, ref) as Source
	}
}
