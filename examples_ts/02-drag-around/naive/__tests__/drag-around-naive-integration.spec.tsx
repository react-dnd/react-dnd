import { cleanup, fireEvent, render } from '@testing-library/react'
import {
  fireDrag,
  fireReleaseDrag,
  tick,
  wrapWithBackend,
} from 'react-dnd-test-utils'

import Example from '../index.js'

describe('Drag Around: Naive', () => {
  afterEach(cleanup)

  it('can hide the source node on drag', async () => {
    const TestExample = wrapWithBackend(Example)
    const rendered = render(<TestExample />)
    const getBoxes = () => rendered.findAllByTestId('box')
    const boxes = await getBoxes()
    expect(boxes.length).toEqual(2)
    const first = boxes[0]

    // Dragging a box hides it
    await fireDrag(first)
    await tick()
    expect(await getBoxes()).toHaveLength(1)

    // Dropping the box shows it again
    await fireReleaseDrag(first)
    expect(await getBoxes()).toHaveLength(2)
  })

  it('can disable source hiding', async () => {
    const TestExample = wrapWithBackend(Example)
    const rendered = render(<TestExample />)
    const getBoxes = () => rendered.findAllByTestId('box')
    const boxes = await getBoxes()
    const checkbox = await rendered.findByRole('checkbox')
    expect(boxes.length).toEqual(2)
    const first = boxes[0]

    // disable source hiding
    await fireEvent.click(checkbox)

    // Drag a box
    await fireDrag(first)
    await tick()
    expect(await getBoxes()).toHaveLength(2)

    // Drop the box
    await fireReleaseDrag(first)
    expect(await getBoxes()).toHaveLength(2)
  })
})
