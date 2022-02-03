import { render, cleanup } from '@testing-library/react'
import { TestBackend } from 'react-dnd-test-backend'
import { DropTarget } from '..'
import { DndProvider } from '../..'

describe('Connectors', () => {
	afterEach(cleanup)

	it('transmit expected arguments to components', () => {
		let connectorFired = false
		let connectArgs: any[] = []

		const Target = DropTarget(
			'BOX',
			{
				drop: () => ({ name: 'Target' }),
			},
			(connect, monitor, props) => {
				connectorFired = true
				connectArgs = [connect, monitor, props]
				return { drop: connect.dropTarget() }
			},
		)((props: any) => props.drop(<div>test target</div>))

		render(
			<DndProvider backend={TestBackend}>
				<Target x={1} y={2} />
			</DndProvider>,
		)

		expect(connectorFired).toBeTruthy()
		expect(connectArgs.length).toEqual(3)
		connectArgs.forEach((c) => expect(c).toBeDefined())
		expect(connectArgs[2].x).toEqual(1)
		expect(connectArgs[2].y).toEqual(2)
	})
})
