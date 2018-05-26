import invariant from 'invariant'
import isPlainObject from 'lodash/isPlainObject'
import { DragDropMonitor, DropTarget } from 'dnd-core'
import { MemoVoidArrayIterator } from 'lodash'
import { DropTargetSpec, DropTargetMonitor } from './interfaces'

const ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop']

export interface Target extends DropTarget {
	receiveProps(props: any): void
	receiveMonitor(monitor: any): void
	receiveComponent(component: any): void
}

export default function createTargetFactory<
	P,
	S,
	TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>
>(spec: DropTargetSpec<P, S, TargetComponent>) {
	Object.keys(spec).forEach(key => {
		invariant(
			ALLOWED_SPEC_METHODS.indexOf(key) > -1,
			'Expected the drop target specification to only have ' +
				'some of the following keys: %s. ' +
				'Instead received a specification with an unexpected "%s" key. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html',
			ALLOWED_SPEC_METHODS.join(', '),
			key,
		)
		invariant(
			typeof (spec as any)[key] === 'function',
			'Expected %s in the drop target specification to be a function. ' +
				'Instead received a specification with %s: %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html',
			key,
			key,
			(spec as any)[key],
		)
	})

	class TargetImpl implements Target {
		private props: any
		private component: any

		constructor(private monitor: DropTargetMonitor) {
			this.props = null
			this.component = null
		}

		public receiveProps(props: any) {
			this.props = props
		}

		public receiveMonitor(monitor: any) {
			this.monitor = monitor
		}

		public receiveComponent(component: any) {
			this.component = component
		}

		public canDrop(): boolean {
			if (!spec.canDrop) {
				return true
			}

			return spec.canDrop(this.props, this.monitor)
		}

		public hover() {
			if (!spec.hover) {
				return
			}

			spec.hover(this.props, this.monitor, this.component)
		}

		public drop() {
			if (!spec.drop) {
				return undefined
			}

			const dropResult = spec.drop(this.props, this.monitor, this.component)
			if (process.env.NODE_ENV !== 'production') {
				invariant(
					typeof dropResult === 'undefined' || isPlainObject(dropResult),
					'drop() must either return undefined, or an object that represents the drop result. ' +
						'Instead received %s. ' +
						'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html',
					dropResult,
				)
			}
			return dropResult
		}
	}

	return function createTarget(monitor: DropTargetMonitor): Target {
		return new TargetImpl(monitor)
	}
}
