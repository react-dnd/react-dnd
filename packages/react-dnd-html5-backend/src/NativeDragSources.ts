import * as NativeTypes from './NativeTypes'
import matchesType from './matchesType'
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

	return result != null // eslint-disable-line eqeqeq
		? result
		: defaultValue
}

const nativeTypesConfig: {
	[key: string]: {
		exposeProperty: string
		matchesType?: string
		matchesTypes?: string[]
		getData: (dataTransfer: any, matchesTypes: any) => any
	}
} = {
	[NativeTypes.FILE]: {
		exposeProperty: 'files',
		matchesTypes: ['Files'],
		getData: (dataTransfer: any) =>
			Array.prototype.slice.call(dataTransfer.files),
	},
	[NativeTypes.URL]: {
		exposeProperty: 'urls',
		matchesTypes: ['Url', 'text/uri-list'],
		getData: (dataTransfer: any, matchesTypes: any) =>
			getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n'),
	},
	[NativeTypes.TEXT]: {
		exposeProperty: 'text',
		matchesTypes: ['Text', 'text/plain'],
		getData: (dataTransfer: any, matchesTypes: any) =>
			getDataFromDataTransfer(dataTransfer, matchesTypes, ''),
	},
}

export function createNativeDragSource(type: any) {
	const { exposeProperty, matchesTypes, getData } = nativeTypesConfig[type]

	return class NativeDragSource {
		public item: any

		constructor() {
			this.item = {
				get [exposeProperty]() {
					// tslint:disable-next-line no-console
					console.warn(
						`Browser doesn't allow reading "${exposeProperty}" until the drop event.`,
					)
					return null
				},
			}
		}

		public mutateItemByReadingDataTransfer(dataTransfer: any) {
			delete this.item[exposeProperty]
			this.item[exposeProperty] = getData(dataTransfer, matchesTypes)
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
