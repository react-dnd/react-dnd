import { useMemo } from 'react'
import { TargetConnector } from '../../internals'

export function useConnectDropTarget(connector: TargetConnector) {
	return useMemo(() => connector.hooks.dropTarget(), [connector])
}
