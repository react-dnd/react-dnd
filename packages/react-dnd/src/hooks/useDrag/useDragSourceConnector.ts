import { useMemo } from 'react'
import { SourceConnector } from '../../internals'
import { DragPreviewOptions, DragSourceOptions } from '../../types'
import { useDragDropManager } from '../useDragDropManager'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

export function useDragSourceConnector(
	dragSourceOptions: DragSourceOptions | undefined,
	dragPreviewOptions: DragPreviewOptions | undefined,
): SourceConnector {
	const manager = useDragDropManager()
	const connector = useMemo(
		() => new SourceConnector(manager.getBackend()),
		[manager],
	)
	useIsomorphicLayoutEffect(() => {
		connector.dragSourceOptions = dragSourceOptions || null
		connector.reconnect()
	}, [connector, dragSourceOptions])
	useIsomorphicLayoutEffect(() => {
		connector.dragPreviewOptions = dragPreviewOptions || null
		connector.reconnect()
	}, [connector, dragPreviewOptions])
	return connector
}
