import isArray from 'lodash/isArray'
import { ItemType, TargetType } from '../interfaces'

export default function matchesType(
	targetType: TargetType | null,
	draggedItemType: ItemType | null,
) {
	if (draggedItemType === null) {
		return targetType === null
	}
	return isArray(targetType)
		? (targetType as ItemType[]).some(t => t === draggedItemType)
		: targetType === draggedItemType
}
