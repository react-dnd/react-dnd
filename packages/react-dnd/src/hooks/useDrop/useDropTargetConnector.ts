import { useMemo } from 'react'
import { TargetConnector } from '../../internals'
import { DropTargetOptions } from '../../types'
import { useDragDropManager } from '../useDragDropManager'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

export function useDropTargetConnector(
	options: DropTargetOptions,
): TargetConnector {
	const manager = useDragDropManager()
	const connector = useMemo(
		() => new TargetConnector(manager.getBackend()),
		[manager],
	)
	useIsomorphicLayoutEffect(() => {
		connector.dropTargetOptions = options || null
		connector.reconnect()
	}, [options])
	return connector
}
