import invariant from 'invariant'
import isPlainObject from 'lodash/isPlainObject'

const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag']
const REQUIRED_SPEC_METHODS = ['beginDrag']

export default function createSourceFactory(spec) {
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

	class Source {
		constructor(monitor) {
			this.monitor = monitor
			this.props = null
			this.component = null
		}

		receiveProps(props) {
			this.props = props
		}

		receiveComponent(component) {
			this.component = component
		}

		canDrag() {
			if (!spec.canDrag) {
				return true
			}

			return spec.canDrag(this.props, this.monitor)
		}

		isDragging(globalMonitor, sourceId) {
			if (!spec.isDragging) {
				return sourceId === globalMonitor.getSourceId()
			}

			return spec.isDragging(this.props, this.monitor)
		}

		beginDrag() {
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

		endDrag() {
			if (!spec.endDrag) {
				return
			}

			spec.endDrag(this.props, this.monitor, this.component)
		}
	}

	return function createSource(monitor) {
		return new Source(monitor)
	}
}
