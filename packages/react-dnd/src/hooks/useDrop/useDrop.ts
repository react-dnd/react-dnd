import { useMemo } from 'react'
import { invariant } from '@react-dnd/invariant'
import { ConnectDropTarget } from '../../types'
import { useMonitorOutput } from '../useMonitorOutput'
import {
	DropTargetHookSpec,
	DragObjectWithType,
	FactoryOrInstance,
} from '../types'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useRegisteredDropTarget } from './useRegisteredDropTarget'
import { useOptionalFactory } from '../useOptionalFactory'

/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export function useDrop<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	specArg: FactoryOrInstance<
		DropTargetHookSpec<DragObject, DropResult, CollectedProps>
	>,
	deps?: unknown[],
): [CollectedProps, ConnectDropTarget] {
	const spec = useOptionalFactory(specArg, deps)
	invariant(spec.accept != null, 'accept must be defined')

	const [monitor, connector] = useRegisteredDropTarget(spec)

	const collected: CollectedProps = useMonitorOutput(
		monitor,
		spec.collect || (() => ({} as CollectedProps)),
		() => connector.reconnect(),
	)

	const connectDropTarget = useMemo(() => connector.hooks.dropTarget(), [
		connector,
	])

	useIsomorphicLayoutEffect(() => {
		connector.dropTargetOptions = spec.options || null
		connector.reconnect()
	}, [spec.options])
	return [collected, connectDropTarget]
}
