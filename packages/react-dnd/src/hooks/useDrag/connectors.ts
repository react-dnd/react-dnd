import { useMemo } from 'react'
import type { SourceConnector } from '../../internals'

export function useConnectDragSource(connector: SourceConnector) {
	return useMemo(() => connector.hooks.dragSource(), [connector])
}

export function useConnectDragPreview(connector: SourceConnector) {
	return useMemo(() => connector.hooks.dragPreview(), [connector])
}
