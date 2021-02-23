import { DragDropManager } from 'dnd-core'
import { useMemo } from 'react'
import { SourceConnector } from '../../internals'

export function useDragSourceConnector(
	manager: DragDropManager,
): SourceConnector {
	return useMemo(() => new SourceConnector(manager.getBackend()), [manager])
}
