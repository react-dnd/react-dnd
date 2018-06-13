import * as React from 'react'
import { DragLayer, XYCoord } from 'react-dnd'
import ItemTypes from './ItemTypes'
import BoxDragPreview from './BoxDragPreview'
import snapToGrid from './snapToGrid'

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
	itemType?: string
	initialOffset?: XYCoord
	currentOffset?: XYCoord
	isDragging?: boolean
	snapToGrid: boolean
}

@DragLayer<CustomDragLayerProps, {}, CustomDragLayer, {}>(monitor => ({
	item: monitor.getItem(),
	itemType: monitor.getItemType(),
	initialOffset: monitor.getInitialSourceClientOffset(),
	currentOffset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
}))
export default class CustomDragLayer extends React.Component<
	CustomDragLayerProps
> {
	public renderItem(type: any, item: any) {
		switch (type) {
			case ItemTypes.BOX:
				return <BoxDragPreview title={item.title} />
			default:
				return null
		}
	}

	public render() {
		const { item, itemType, isDragging } = this.props

		if (!isDragging) {
			return null
		}

		return (
			<div style={layerStyles}>
				<div style={getItemStyles(this.props)}>
					{this.renderItem(itemType, item)}
				</div>
			</div>
		)
	}
}
