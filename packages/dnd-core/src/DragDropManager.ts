import { createStore, Store } from 'redux'
import reducer from './reducers'
import * as dragDropActions from './actions/dragDrop'
import DragDropMonitor from './DragDropMonitor'
import {
	Backend,
	BackendFactory,
	DragDropManager,
	DragDropActions,
} from './interfaces'
import { State } from './reducers'

export default class DragDropManagerImpl<Context>
	implements DragDropManager<Context> {
	private store: Store<State>
	private monitor: DragDropMonitor
	private backend: Backend
	private isSetUp: boolean = false

	constructor(
		createBackend: BackendFactory,
		private context: Context = {} as Context,
	) {
		const store = createStore(reducer)
		this.store = store
		this.monitor = new DragDropMonitor(store)
		this.backend = createBackend(this)

		store.subscribe(this.handleRefCountChange.bind(this))
	}

	private handleRefCountChange() {
		const shouldSetUp = this.store.getState().refCount > 0
		if (shouldSetUp && !this.isSetUp) {
			this.backend.setup()
			this.isSetUp = true
		} else if (!shouldSetUp && this.isSetUp) {
			this.backend.teardown()
			this.isSetUp = false
		}
	}

	public getContext() {
		return this.context
	}

	public getMonitor() {
		return this.monitor
	}

	public getBackend() {
		return this.backend
	}

	public getRegistry() {
		return this.monitor.registry
	}

	public getActions() {
		const manager = this
		const { dispatch } = this.store

		function bindActionCreator(actionCreator) {
			return (...args) => {
				const action = actionCreator.apply(manager, args)
				if (typeof action !== 'undefined') {
					dispatch(action)
				}
			}
		}

		return Object.keys(dragDropActions)
			.filter(key => typeof dragDropActions[key] === 'function')
			.reduce((boundActions, key) => {
				const action = dragDropActions[key]
				boundActions[key] = bindActionCreator(action) // eslint-disable-line no-param-reassign
				return boundActions
			}, {}) as DragDropActions
	}
}
