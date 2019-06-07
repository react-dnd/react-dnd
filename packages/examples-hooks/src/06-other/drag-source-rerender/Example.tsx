import React, { useState, useCallback } from 'react'
import { useDrag, ConnectDragSource } from 'react-dnd'

const Parent: React.FC = () => {
	const [{ isDragging }, drag] = useDrag({
		item: { type: 'KNIGHT' },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	return <Child drag={drag}>{isDragging ? 'Dragging' : 'Drag me'}</Child>
}

export default Parent

interface ChildProps {
	drag: ConnectDragSource
}
const Child: React.FC<ChildProps> = ({ drag, children }) => {
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
