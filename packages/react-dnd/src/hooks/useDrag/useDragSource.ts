import { useEffect, useMemo } from 'react'
import { Connector } from '../../internals'
import { DragSourceMonitor } from '../../types'
import { DragSourceHookSpec } from '../types'
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
