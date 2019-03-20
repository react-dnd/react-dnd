import * as React from 'react'
import {
	__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__,
	XYCoord,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'
import { DragItem } from './interfaces'

const {
	useDrop,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const styles: React.CSSProperties = {
	width: 300,
	height: 300,
	border: '1px solid black',
	position: 'relative',
}

export interface ContainerProps {
	hideSourceOnDrag: boolean
}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number; title: string } }
}

const Container: React.FC<ContainerProps> = ({ hideSourceOnDrag }) => {
	const [boxes, setBoxes] = React.useState<{
		[key: string]: {
			top: number
			left: number
			title: string
		}
	}>({
		a: { top: 20, left: 80, title: 'Drag me around' },
		b: { top: 180, left: 20, title: 'Drag me too' },
	})

	const [, connect] = useDrop({
		accept: ItemTypes.BOX,
		drop(item: DragItem, monitor) {
			const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
			const left = Math.round(item.left + delta.x)
			const top = Math.round(item.top + delta.y)
			moveBox(item.id, left, top)
			return undefined
		},
	})

	const moveBox = (id: string, left: number, top: number) => {
		setBoxes(
			update(boxes, {
				[id]: {
					$merge: { left, top },
				},
			}),
		)
	}

	return (
		<div ref={node => connect(node)} style={styles}>
			{Object.keys(boxes).map(key => {
				const { left, top, title } = boxes[key]
				return (
					<Box
						key={key}
						id={key}
						left={left}
						top={top}
						hideSourceOnDrag={hideSourceOnDrag}
					>
						{title}
					</Box>
				)
			})}
		</div>
	)
}
export default Container
