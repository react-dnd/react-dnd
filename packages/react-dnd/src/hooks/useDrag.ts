declare var require: any
import {
	DragSourceHookSpec,
	DragObjectWithType,
	ConnectDragSource,
	ConnectDragPreview,
} from '../interfaces'
import { useMonitorOutput } from './internal/useMonitorOutput'
import { useDragSourceMonitor, useDragHandler } from './internal/drag'
import { useMemo, useEffect } from 'react'
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
	specFn: () => DragSourceHookSpec<DragObject, DropResult, CollectedProps>,
	memoKeys: any[] = [],
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
	const spec = useMemo(specFn, memoKeys)
	const collect = useMemo(() => spec.collect, [spec])

	// TODO: wire options into createSourceConnector
	invariant(spec.item != null, 'item must be defined')
	invariant(spec.item.type != null, 'item type must be defined')

	const [monitor, connector] = useDragSourceMonitor()
	useDragHandler(spec, monitor, connector)

	const result: CollectedProps = collect
		? (useMonitorOutput(monitor as any, connector, collect as any) as any)
		: ({} as CollectedProps)

	const connectDragSource = useMemo(() => connector.hooks.dragSource(), [
		connector,
	])
	const connectDragPreview = useMemo(() => connector.hooks.dragPreview(), [
		connector,
	])

	useEffect(() => connectDragPreview(spec.preview), [spec.preview])
	useEffect(() => connector.setDragSourceOptions(spec.options), [spec.options])
	useEffect(() => connector.setDragPreviewOptions(spec.previewOptions), [
		spec.previewOptions,
	])
	return [result, connectDragSource, connectDragPreview]
}
