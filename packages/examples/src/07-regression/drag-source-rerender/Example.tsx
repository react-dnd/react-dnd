import type { FC, ReactNode } from 'react'
import { useCallback, useState } from 'react'
import type { ConnectDragSource } from 'react-dnd'
import { useDrag } from 'react-dnd'

export const Example: FC = () => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'KNIGHT',
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	return <Child drag={drag}>{isDragging ? 'Dragging' : 'Drag me'}</Child>
}

interface ChildProps {
	drag: ConnectDragSource
	children?: ReactNode
}
const Child: FC<ChildProps> = ({ drag, children }) => {
	const [open, setOpen] = useState(true)
	const toggle = useCallback(() => setOpen(!open), [open])

	return (
		<div
			style={{
				padding: 16,
				width: 400,
			}}
		>
			<button onClick={toggle}>{open ? 'Hide' : 'Show'}</button>
			{open ? (
				<div
					ref={drag}
					style={{
						padding: 32,
						marginTop: 16,
						background: '#eee',
					}}
				>
					{children}
				</div>
			) : null}
		</div>
	)
}
