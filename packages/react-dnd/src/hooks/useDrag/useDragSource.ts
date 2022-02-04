import { useEffect, useMemo } from 'react'
import type { Connector } from '../../internals'
import type { DragSourceMonitor } from '../../types'
import type { DragSourceHookSpec } from '../types'
import { DragSourceImpl } from './DragSourceImpl'

export function useDragSource<O, R, P>(
	spec: DragSourceHookSpec<O, R, P>,
	monitor: DragSourceMonitor<O, R>,
	connector: Connector,
) {
	const handler = useMemo(
		() => new DragSourceImpl(spec, monitor, connector),
		[monitor, connector],
	)
	useEffect(() => {
		handler.spec = spec
	}, [spec])
	return handler
}
