import isArray from 'lodash/isArray'
import { Identifier } from '../interfaces'

export default function matchesType(
	targetType: Identifier | Identifier[] | null,
	draggedItemType: Identifier | null,
) {
	if (draggedItemType === null) {
		return targetType === null
	}
	return isArray(targetType)
		? (targetType as Identifier[]).some(t => t === draggedItemType)
		: targetType === draggedItemType
}
