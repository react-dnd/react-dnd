import { NativeItemConfig } from './nativeTypesConfig'
import { DragDropMonitor } from 'dnd-core'

export class NativeDragSource {
	public item: any

	constructor(private config: NativeItemConfig) {
		this.item = {}
		Object.keys(this.config.exposeProperties).forEach(property => {
			Object.defineProperty(this.item, property, {
				configurable: true, // This is needed to allow redefining it later
				enumerable: true,
				get() {
					// eslint-disable-next-line no-console
					console.warn(
						`Browser doesn't allow reading "${property}" until the drop event.`,
					)
					return null
				},
			})
		})
	}

	public mutateItemByReadingDataTransfer(dataTransfer: DataTransfer | null) {
		const newProperties: PropertyDescriptorMap = {}
		if (dataTransfer) {
			Object.keys(this.config.exposeProperties).forEach(property => {
				newProperties[property] = {
					value: this.config.exposeProperties[property](
						dataTransfer,
						this.config.matchesTypes,
					),
				}
			})
		}
		Object.defineProperties(this.item, newProperties)
	}

	public canDrag() {
		return true
	}

	public beginDrag() {
		return this.item
	}

	public isDragging(monitor: DragDropMonitor, handle: string) {
		return handle === monitor.getSourceId()
	}

	public endDrag() {
		// empty
	}
}
