import invariant from 'invariant'
import isPlainObject from 'lodash/isPlainObject'
import { IDragSource, IDragDropMonitor } from 'dnd-core'

const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag']
const REQUIRED_SPEC_METHODS = ['beginDrag']

export interface ISource extends IDragSource {
	receiveProps(props: any): void
	receiveComponent(component: any): void
}

export default function createSourceFactory(spec: any) {
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
			typeof spec[key] === 'function',
			'Expected %s in the drag source specification to be a function. ' +
				'Instead received a specification with %s: %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
			key,
			key,
			spec[key],
		)
	})
	REQUIRED_SPEC_METHODS.forEach(key => {
		invariant(
			typeof spec[key] === 'function',
			'Expected %s in the drag source specification to be a function. ' +
				'Instead received a specification with %s: %s. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html',
			key,
			key,
			spec[key],
		)
	})

	class Source implements ISource {
		private props: any
		private component: any

		constructor(private monitor: IDragDropMonitor) {}

		public receiveProps(props: any) {
			this.props = props
		}

		public receiveComponent(component: any) {
			this.component = component
		}

		public canDrag() {
			if (!spec.canDrag) {
				return true
			}

			return spec.canDrag(this.props, this.monitor)
		}

		public isDragging(globalMonitor: IDragDropMonitor, sourceId: string) {
			if (!spec.isDragging) {
				return sourceId === globalMonitor.getSourceId()
			}

			return spec.isDragging(this.props, this.monitor)
		}

		public beginDrag() {
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
			if (!spec.endDrag) {
				return
			}

			spec.endDrag(this.props, this.monitor, this.component)
		}
	}

	return function createSource(monitor: IDragDropMonitor) {
		return new Source(monitor) as ISource
	}
}
