import { nativeTypesConfig } from './nativeTypesConfig'
import { NativeDragSource } from './NativeDragSource'

export function createNativeDragSource(type: string): NativeDragSource {
	return new NativeDragSource(nativeTypesConfig[type])
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
