import { createStore, Store } from 'redux'
import reducer from './reducers'
import dragDropActions from './actions/dragDrop'
import DragDropMonitor from './DragDropMonitor'
import {
	ActionCreator,
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

	public getMonitor(): DragDropMonitor {
		return this.monitor
	}

	public getBackend() {
		return this.backend
	}

	public getRegistry() {
		return this.monitor.registry
	}

	public getActions(): DragDropActions {
		const manager = this
		const { dispatch } = this.store

		function bindActionCreator(actionCreator: ActionCreator) {
			return (...args: any[]) => {
				const action = actionCreator.apply(manager, args)
				if (typeof action !== 'undefined') {
					dispatch(action)
				}
			}
		}

		const actions = dragDropActions(this)

		return Object.keys(actions).reduce(
			(boundActions: DragDropActions, key: string) => {
				const action: ActionCreator = (actions as any)[key] as ActionCreator
				;(boundActions as any)[key] = bindActionCreator(action) // eslint-disable-line no-param-reassign
				return boundActions
			},
			{} as DragDropActions,
		)
	}

	public dispatch(action: any) {
		this.store.dispatch(action)
	}
}
