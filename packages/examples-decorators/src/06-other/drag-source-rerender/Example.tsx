import React, { useState, useCallback } from 'react'
import { ConnectDragSource } from 'react-dnd'
import { DragSource } from 'react-dnd'

interface ParentProps {
	isDragging: boolean
	connectDragSource: ConnectDragSource
}
const Parent: React.FC<ParentProps> = ({ isDragging, connectDragSource }) => {
	return (
		<Child connect={connectDragSource}>
			{isDragging ? 'Dragging' : 'Drag me'}
		</Child>
	)
}

const Example = DragSource(
	'KNIGHT',
	{
		beginDrag: () => ({}),
	},
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Parent)
export default Example

interface ChildProps {
	connect: ConnectDragSource
}

const Child: React.FC<ChildProps> = ({ connect, children }) => {
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
					ref={node => connect(node)}
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
