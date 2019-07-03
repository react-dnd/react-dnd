import { DragDropManager } from 'dnd-core'
import { Opts } from './interfaces'
import { isDragDropManager } from './utils/predicates'
import TouchBackend from './TouchBackend'

export default function createTouchBackend(
	optionsOrManager: DragDropManager<any> | Opts,
) {
	const touchBackendFactory = function(manager: DragDropManager<any>) {
		return new TouchBackend(manager, optionsOrManager as Opts)
	}

	if (isDragDropManager(optionsOrManager)) {
		return touchBackendFactory(optionsOrManager)
	} else {
		return touchBackendFactory
	}
}
