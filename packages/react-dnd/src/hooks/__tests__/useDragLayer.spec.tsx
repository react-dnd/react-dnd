import { cleanup, render } from '@testing-library/react'
import type { FC } from 'react'
import { TestBackend } from 'react-dnd-test-backend'
import { fireDrag } from 'react-dnd-test-utils'

import { DndProvider } from '../../index.js'
import { useDrag } from '../useDrag/index.js'
import { useDragLayer } from '../useDragLayer.js'

const DragLayer: FC = () => {
	const { isDragging, item } = useDragLayer((monitor) => ({
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		isDragging: monitor.isDragging(),
	}))

	function renderItem() {
		return item == null ? null : <div role="drag-layer" />
	}

	if (!isDragging) {
		return null
	}
	return (
		<div>
			<div>{renderItem()}</div>
		</div>
	)
}

const Box: FC = () => {
	const [, drag] = useDrag({
		type: 'box',
	})
	return <div role="box" ref={drag} />
}

describe('useDragLayer()', () => {
	afterEach(cleanup)

	it('can be used to retrieve information from the dnd monitor', async () => {
		const Example = () => (
			<div>
				<Box />
				<DragLayer />
			</div>
		)
		const rendered = render(
			<DndProvider backend={TestBackend}>
				<Example />
			</DndProvider>,
		)
		const box = await rendered.findByRole('box')
		let dragLayer = rendered.queryByRole('drag-layer')
		expect(box).toBeDefined()
		expect(dragLayer).toEqual(null)

		fireDrag(box)
		dragLayer = rendered.queryByRole('drag-layer')
		expect(dragLayer).toBeDefined()
	})
})
