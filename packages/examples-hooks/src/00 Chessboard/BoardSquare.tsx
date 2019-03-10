import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import { Square } from './Square'
import { canMoveKnight, moveKnight } from './Game'
import ItemTypes from './ItemTypes'
import Overlay from './Overlay'

const {
	useDrop,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__
export interface BoardSquareProps {
	x: number
	y: number
	children: any
}

export const BoardSquare: React.FC<BoardSquareProps> = (
	props: BoardSquareProps,
) => {
	const [{ isOver, canDrop }, ref] = useDrop({
		accept: ItemTypes.KNIGHT,
		canDrop: () => canMoveKnight(props.x, props.y),
		drop: () => moveKnight(props.x, props.y),
		collect: mon => ({
			isOver: !!mon.isOver(),
			canDrop: !!mon.canDrop(),
		}),
	})
	const black = (props.x + props.y) % 2 === 1

	return (
		<div
			ref={ref}
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
			}}
		>
			<Square black={black}>{props.children}</Square>
			{isOver && !canDrop && <Overlay color="red" />}
			{!isOver && canDrop && <Overlay color="yellow" />}
			{isOver && canDrop && <Overlay color="green" />}
		</div>
	)
}
