import { DragDropManager } from 'dnd-core'
import { useMemo } from 'react'
import { TargetConnector } from '../../internals'

export function useDropTargetConnector(
	manager: DragDropManager,
): TargetConnector {
	return useMemo(() => new TargetConnector(manager.getBackend()), [manager])
}
