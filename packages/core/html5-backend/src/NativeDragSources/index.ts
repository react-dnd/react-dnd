import { nativeTypesConfig } from './nativeTypesConfig'
import { NativeDragSource } from './NativeDragSource'
import * as NativeTypes from '../NativeTypes'

export function createNativeDragSource(
	type: string,
	dataTransfer?: DataTransfer,
): NativeDragSource {
	return new NativeDragSource(
		nativeTypesConfig[type],
		type === NativeTypes.FILE ? dataTransfer : undefined,
	)
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
