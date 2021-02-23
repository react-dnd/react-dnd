import { render } from '@testing-library/react'
import { wrapWithBackend, fireDrag } from 'react-dnd-test-utils'
import { FC } from 'react'
import { useDrag } from '../useDrag'
import { useDragLayer } from '../useDragLayer'

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
		item: { type: 'box' },
	})
	return <div role="box" ref={drag} />
}

describe('useDragLayer()', () => {
	it('can be used to retrieve information from the dnd monitor', async () => {
		const Example = () => (
			<div>
				<Box />
				<DragLayer />
			</div>
		)
		const Wrapped = wrapWithBackend(Example)
		const rendered = render(<Wrapped />)
		const box = await rendered.findByRole('box')
		let dragLayer = rendered.queryByRole('drag-layer')
		expect(box).toBeDefined()
		expect(dragLayer).toEqual(null)

		fireDrag(box)
		dragLayer = rendered.queryByRole('drag-layer')
		expect(dragLayer).toBeDefined()
	})
})
