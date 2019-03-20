import * as React from 'react'
import {
	__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__,
	ConnectDragSource,
} from 'react-dnd'

const {
	useDrag,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const Parent: React.FC = () => {
	const [{ isDragging }, connect] = useDrag({
		item: { type: 'KNIGHT' },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	return <Child connect={connect}>{isDragging ? 'Dragging' : 'Drag me'}</Child>
}

export default Parent

interface ChildProps {
	connect: ConnectDragSource
}
const Child: React.FC<ChildProps> = ({ connect, children }) => {
	const [open, setOpen] = React.useState(true)
	const toggle = React.useCallback(() => setOpen(!open), [open])

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
