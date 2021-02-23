import { useEffect, useMemo } from 'react'
import { Connector } from '../../internals'
import { DragSourceMonitor } from '../../types'
import { DragObjectWithType, DragSourceHookSpec } from '../types'
import { DragSourceImpl } from './DragSourceImpl'

export function useDragSource<O extends DragObjectWithType, R, P>(
	spec: DragSourceHookSpec<O, R, P>,
	monitor: DragSourceMonitor,
	connector: Connector,
) {
	const handler = useMemo(() => new DragSourceImpl(spec, monitor, connector), [
		monitor,
		connector,
	])
	useEffect(() => {
		handler.spec = spec
	}, [spec])
	return handler
}
