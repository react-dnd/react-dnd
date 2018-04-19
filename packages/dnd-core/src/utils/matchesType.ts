import isArray from 'lodash/isArray'
import { ItemType, TargetType } from '../interfaces'

export default function matchesType(
	targetType: TargetType,
	draggedItemType: ItemType,
) {
	return isArray(targetType)
		? (targetType as ItemType[]).some(t => t === draggedItemType)
		: targetType === draggedItemType
}
