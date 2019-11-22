import { nativeTypesConfig } from './nativeTypesConfig'
import { NativeDragSource } from './NativeDragSource'

export function createNativeDragSource(
	type: string,
	dataTransfer?: DataTransfer,
): NativeDragSource {
	const result = new NativeDragSource(nativeTypesConfig[type])
	result.loadDataTransfer(dataTransfer)
	return result
}

export function matchNativeItemType(
	dataTransfer: DataTransfer | null,
): string | null {
	if (!dataTransfer) {
		return null
	}

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
