import { useEffect, useRef, useMemo } from 'react'
import invariant from 'invariant'
import {
	DropTargetHookSpec,
	ConnectDropTarget,
	DragObjectWithType,
} from '../interfaces'
import { useMonitorOutput } from './internal/useMonitorOutput'
import { useDropHandler, useDropTargetMonitor } from './internal/drop'

/**
 * useDropTarget Hook
 * @param spec The drop target specification
 */
export function useDrop<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	spec: DropTargetHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, ConnectDropTarget] {
	const specRef = useRef(spec)
	specRef.current = spec
	invariant(spec.accept != null, 'accept must be defined')

	const [monitor, connector] = useDropTargetMonitor()
	useDropHandler(specRef, monitor, connector)

	const result: CollectedProps = useMonitorOutput(
		monitor,
		specRef.current.collect || (() => ({} as CollectedProps)),
		() => connector.reconnect(),
	)

	const connectDropTarget = useMemo(() => connector.hooks.dropTarget(), [
		connector,
	])

	useEffect(() => {
		connector.dropTargetOptions = spec.options || null
		connector.reconnect()
	}, [spec.options])
	return [result, connectDropTarget]
}
