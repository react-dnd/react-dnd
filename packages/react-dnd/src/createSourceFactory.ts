import invariant from 'invariant'
import isPlainObject from 'lodash/isPlainObject'
import { DragSource, DragDropMonitor } from 'dnd-core'
import { DragSourceSpec, DragSourceMonitor } from './interfaces'
import { ComponentClass } from 'react'

const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag']
const REQUIRED_SPEC_METHODS = ['beginDrag']

export interface Source extends DragSource {
	receiveProps(props: any): void
	receiveComponent(component: any): void
}

export default function createSourceFactory<
	P,
	S,
	TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>,
	DragObject
>(spec: DragSourceSpec<P, S, TargetComponent, DragObject>) {
	Object.keys(spec).forEach(key => {
		invariant(
			ALLOWED_SPEC_METHODS.indexOf(key) > -1,
			'Expected the drag source specification to only have ' +
				'some of the following keys: %s. ' +
				'Instead received a specification with an unexpected "%s" key. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
			ALLOWED_SPEC_METHODS.join(', '),
			key,
		)
		invariant(
			typeof (spec as any)[key] === 'function',
			'Expected %s in the drag source specification to be a function. ' +
				'Instead received a specification with %s: %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
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
				'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
			key,
			key,
			(spec as any)[key],
		)
	})

	class SourceImpl implements Source {
		private props: P | undefined
		private component: TargetComponent | undefined

		constructor(private monitor: DragSourceMonitor) {
			this.receiveComponent = this.receiveComponent.bind(this)
			this.beginDrag = this.beginDrag.bind(this)
		}

		public receiveProps(props: any) {
			this.props = props
		}

		public receiveComponent(component: TargetComponent) {
			this.component = component
		}

		public canDrag() {
			if (!this.props) {
				return false
			}
			if (!spec.canDrag) {
				return true
			}

			return spec.canDrag(this.props, this.monitor)
		}

		public isDragging(globalMonitor: DragDropMonitor, sourceId: string) {
			if (!this.props) {
				return false
			}
			if (!spec.isDragging) {
				return sourceId === globalMonitor.getSourceId()
			}

			return spec.isDragging(this.props, this.monitor)
		}

		public beginDrag() {
			if (!this.props || !this.component) {
				return
			}
			const item = spec.beginDrag(this.props, this.monitor, this.component)
			if (process.env.NODE_ENV !== 'production') {
				invariant(
					isPlainObject(item),
					'beginDrag() must return a plain object that represents the dragged item. ' +
						'Instead received %s. ' +
						'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
					item,
				)
			}
			return item
		}

		public endDrag() {
			if (!this.props || !this.component) {
				return
			}
			if (!spec.endDrag) {
				return
			}

			spec.endDrag(this.props, this.monitor, this.component)
		}
	}

	return function createSource(monitor: DragSourceMonitor) {
		return new SourceImpl(monitor) as Source
	}
}
