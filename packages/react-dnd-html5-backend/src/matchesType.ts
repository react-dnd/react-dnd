//
// HACK: copied from dnd-core. duplicating here to fix a CI issue
//
import isArray from 'lodash/isArray'
import { ItemType, TargetType } from 'dnd-core'

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
