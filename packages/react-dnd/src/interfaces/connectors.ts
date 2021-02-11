import { RefObject, ReactElement } from 'react'
import { DragSourceOptions, DragPreviewOptions } from '../interfaces'

export type ConnectableElement = RefObject<any> | ReactElement | Element | null

export type DragElementWrapper<Options> = (
	elementOrNode: ConnectableElement,
	options?: Options,
) => ReactElement | null

export type ConnectDragSource = DragElementWrapper<DragSourceOptions>
export type ConnectDragPreview = DragElementWrapper<DragPreviewOptions>
export type ConnectDropTarget = DragElementWrapper<any>
