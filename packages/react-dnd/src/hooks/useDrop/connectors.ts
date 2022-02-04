import { useMemo } from 'react'
import type { TargetConnector } from '../../internals'

export function useConnectDropTarget(connector: TargetConnector) {
	return useMemo(() => connector.hooks.dropTarget(), [connector])
}
