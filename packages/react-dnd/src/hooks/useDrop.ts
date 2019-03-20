declare var require: any
import {
	DropTargetHookSpec,
	ConnectDropTarget,
	DragObjectWithType,
} from '../interfaces'
import { useMonitorOutput } from './internal/useMonitorOutput'
import { useRefObject } from './internal/useRefObject'
import { useDropTargetMonitor } from './internal/useDropTargetMonitor'
import { useDropHandler } from './internal/useDropHandler'
const invariant = require('invariant')

/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
export function useDrop<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	targetSpec: DropTargetHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, ConnectDropTarget] {
	invariant(targetSpec.accept != null, 'accept must be defined')
	const spec = useRefObject(targetSpec)
	const [monitor, connector] = useDropTargetMonitor()
	useDropHandler(spec, monitor, connector)

	const result: CollectedProps & {
		ref: React.RefObject<Element>
	} = targetSpec.collect
		? (useMonitorOutput(
				monitor as any,
				connector,
				targetSpec.collect as any,
		  ) as any)
		: (({} as CollectedProps) as any)

	return [result, (connector as any).hooks.dropTarget()]
}
