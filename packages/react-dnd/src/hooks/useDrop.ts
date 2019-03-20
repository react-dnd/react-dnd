declare var require: any
import { useMemo } from 'react'
import { DropTargetHookSpec, ConnectDropTarget } from '../interfaces'
import { useDropTargetMonitor } from './internal/useDropTargetMonitor'
import { useMonitorOutput } from './internal/useMonitorOutput'
const invariant = require('invariant')

/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
export function useDrop<DragObject, DropResult, CollectedProps>(
	spec: DropTargetHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, ConnectDropTarget] {
	const accept = useMemo(() => spec.accept, [spec])
	const collect = useMemo(() => spec.collect, [spec])

	invariant(accept != null, 'accept must be defined')
	const [monitor, connector] = useDropTargetMonitor(spec)
	const result: CollectedProps & { ref: React.RefObject<Element> } = collect
		? (useMonitorOutput(monitor as any, connector, collect as any) as any)
		: (({} as CollectedProps) as any)
	return [result, (connector as any).hooks.dropTarget()]
}
