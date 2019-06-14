import React from 'react'
import { XYCoord } from 'react-dnd'
import { DragLayer } from 'react-dnd'
import ItemTypes from './ItemTypes'
import BoxDragPreview from './BoxDragPreview'
import snapToGrid from './snapToGrid'
import { Identifier } from 'dnd-core'

const layerStyles: React.CSSProperties = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
}

function getItemStyles(props: CustomDragLayerProps) {
	const { initialOffset, currentOffset } = props
	if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		}
	}

	let { x, y } = currentOffset

	if (props.snapToGrid) {
		x -= initialOffset.x
		y -= initialOffset.y
		;[x, y] = snapToGrid(x, y)
		x += initialOffset.x
		y += initialOffset.y
	}

	const transform = `translate(${x}px, ${y}px)`
	return {
		transform,
		WebkitTransform: transform,
	}
}

export interface CustomDragLayerProps {
	item?: any
	itemType?: Identifier | null
	initialOffset?: XYCoord | null
	currentOffset?: XYCoord | null
	isDragging?: boolean
	snapToGrid: boolean
}

const CustomDragLayer: React.FC<CustomDragLayerProps> = props => {
	const { item, itemType, isDragging } = props

	function renderItem() {
		switch (itemType) {
			case ItemTypes.BOX:
				return <BoxDragPreview title={item.title} />
			default:
				return null
		}
	}

	if (!isDragging) {
		return null
	}
	return (
		<div style={layerStyles}>
			<div style={getItemStyles(props)}>{renderItem()}</div>
		</div>
	)
}

export default DragLayer(monitor => ({
	item: monitor.getItem(),
	itemType: monitor.getItemType(),
	initialOffset: monitor.getInitialSourceClientOffset(),
	currentOffset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
}))(CustomDragLayer)
