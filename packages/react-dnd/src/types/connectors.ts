import type { RefObject, ReactElement } from 'react'
import type { DragSourceOptions, DragPreviewOptions } from './options'

export type ConnectableElement = RefObject<any> | ReactElement | Element | null

export type DragElementWrapper<Options> = (
	elementOrNode: ConnectableElement,
	options?: Options,
) => ReactElement | null

export type ConnectDragSource = DragElementWrapper<DragSourceOptions>
export type ConnectDropTarget = DragElementWrapper<any>
export type ConnectDragPreview = DragElementWrapper<DragPreviewOptions>
