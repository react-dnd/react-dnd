import * as React from 'react'
import ItemTypes from '../Single Target/ItemTypes'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
const {
	useDrag,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style: React.CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	float: 'left',
}

export interface BoxProps {
	name: string
}

const Box: React.FC<BoxProps> = ({ name }) => {
	const ref = React.useRef(null)
	const { opacity } = useDrag({
		ref,
		item: { name, type: ItemTypes.BOX },
		end(monitor) {
			const item = monitor.getItem()
			const dropResult = monitor.getDropResult()

			if (dropResult) {
				let alertMessage = ''
				const isDropAllowed =
					dropResult.allowedDropEffect === 'any' ||
					dropResult.allowedDropEffect === dropResult.dropEffect

				if (isDropAllowed) {
					const isCopyAction = dropResult.dropEffect === 'copy'
					const actionName = isCopyAction ? 'copied' : 'moved'
					alertMessage = `You ${actionName} ${item.name} into ${
						dropResult.name
					}!`
				} else {
					alertMessage = `You cannot ${
						dropResult.dropEffect
					} an item into the ${dropResult.name}`
				}
				alert(alertMessage)
			}
		},
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.4 : 1,
		}),
	})

	return (
		<div ref={ref} style={{ ...style, opacity }}>
			{name}
		</div>
	)
}
export default Box
