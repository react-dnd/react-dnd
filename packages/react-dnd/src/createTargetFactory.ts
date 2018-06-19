import { createRef } from 'react'
import { DropTarget } from 'dnd-core'
import { DropTargetSpec, DropTargetMonitor } from './interfaces'
const invariant = require('invariant')
const isPlainObject = require('lodash/isPlainObject')

const ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop']

export interface Target extends DropTarget {
	receiveProps(props: any): void
	receiveMonitor(monitor: any): void
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
		private props: Props | null = null
		private ref: React.RefObject<any> = createRef()

		constructor(private monitor: DropTargetMonitor) {}

		public receiveProps(props: any) {
			this.props = props
		}

		public receiveMonitor(monitor: any) {
			this.monitor = monitor
		}

		public canDrop(): boolean {
			if (!spec.canDrop) {
				return true
			}

			return spec.canDrop(this.props as Props, this.monitor)
		}

		public hover() {
			if (!spec.hover) {
				return
			}

			spec.hover(this.props as Props, this.monitor, this.ref.current)
		}

		public drop() {
			if (!spec.drop) {
				return undefined
			}

			const dropResult = spec.drop(
				this.props as Props,
				this.monitor,
				this.ref.current,
			)
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
