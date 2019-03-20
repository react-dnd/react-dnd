declare var require: any
import { useMemo } from 'react'
import {
	DragSourceHookSpec,
	DragObjectWithType,
	ConnectDragSource,
	ConnectDragPreview,
} from '../interfaces'
import { useDragSourceMonitor } from './internal/useDragSourceMonitor'
import { useMonitorOutput } from './internal/useMonitorOutput'
const invariant = require('invariant')

/**
 * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)
 * @param sourceSpec The drag source specification *
 */
export function useDrag<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	spec: DragSourceHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
	// TODO: wire options into createSourceConnector
	const item = useMemo(() => spec.item, [spec])
	const collect = useMemo(() => spec.collect, [spec])
	invariant(item != null, 'item must be defined')
	invariant(item.type != null, 'item type must be defined')
	const [monitor, connector] = useDragSourceMonitor<
		DragObject,
		DropResult,
		CollectedProps
	>(spec)

	const result: CollectedProps = collect
		? (useMonitorOutput(monitor as any, connector, collect as any) as any)
		: (({} as CollectedProps) as any)

	return [
		result,
		(connector as any).hooks.dragSource(),
		(connector as any).hooks.dragPreview(),
	]
}
