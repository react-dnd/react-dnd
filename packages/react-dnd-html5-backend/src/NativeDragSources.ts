import * as NativeTypes from './NativeTypes'
import { DragDropMonitor } from 'dnd-core'

function getDataFromDataTransfer(
	dataTransfer: any,
	typesToTry: string[],
	defaultValue: any,
) {
	const result = typesToTry.reduce(
		(resultSoFar, typeToTry) => resultSoFar || dataTransfer.getData(typeToTry),
		null,
	)

	return result != null ? result : defaultValue
}

const nativeTypesConfig: {
	[key: string]: {
		exposeProperties: {
			[property: string]: (dataTransfer: any, matchesTypes: any) => any
		}
		matchesType?: string
		matchesTypes?: string[]
	}
} = {
	[NativeTypes.FILE]: {
		exposeProperties: {
			files: (dataTransfer: any) =>
				Array.prototype.slice.call(dataTransfer.files),
			items: (dataTransfer: any) => dataTransfer.items,
		},
		matchesTypes: ['Files'],
	},
	[NativeTypes.URL]: {
		exposeProperties: {
			urls: (dataTransfer: any, matchesTypes: any) =>
				getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n'),
		},
		matchesTypes: ['Url', 'text/uri-list'],
	},
	[NativeTypes.TEXT]: {
		exposeProperties: {
			text: (dataTransfer: any, matchesTypes: any) =>
				getDataFromDataTransfer(dataTransfer, matchesTypes, ''),
		},
		matchesTypes: ['Text', 'text/plain'],
	},
}

export function createNativeDragSource(type: any) {
	const { exposeProperties, matchesTypes } = nativeTypesConfig[type]

	return class NativeDragSource {
		public item: any

		constructor() {
			this.item = Object.create(
				Object.keys(exposeProperties).map(property => ({
					configurable: true, // This is needed to allow redefining it later
					get() {
						// tslint:disable-next-line no-console
						console.warn(
							`Browser doesn't allow reading "${property}" until the drop event.`,
						)
						return null
					},
				})),
			)
		}

		public mutateItemByReadingDataTransfer(dataTransfer: any) {
			const newProperties: PropertyDescriptorMap = {}
			Object.keys(exposeProperties).forEach(property => {
				newProperties[property] = {
					value: exposeProperties[property](dataTransfer, matchesTypes),
				}
			})
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
}

export function matchNativeItemType(dataTransfer: any) {
	const dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || [])

	return (
		Object.keys(nativeTypesConfig).filter(nativeItemType => {
			const { matchesTypes } = nativeTypesConfig[nativeItemType]
			return (matchesTypes as string[]).some(
				t => dataTransferTypes.indexOf(t) > -1,
			)
		})[0] || null
	)
}
