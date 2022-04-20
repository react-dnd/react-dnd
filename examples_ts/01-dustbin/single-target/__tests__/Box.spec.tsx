import { cleanup, fireEvent, render } from '@testing-library/react'
import { fireDrag, wrapWithBackend } from 'react-dnd-test-utils'

import { Box } from '../Box.js'

describe('Box', () => {
  afterEach(cleanup)

  it('can be tested with a backend', async () => {
    const TestBox = wrapWithBackend(Box)
    const rendered = render(<TestBox name="test" />)

    // Check that the opacity is 1
    const box = rendered.getByTestId('box')
    expect(box).toBeDefined()
    expect(box).toHaveStyle({ opacity: '1' })

    // Opacity drops on Drag
    await fireDrag(box)
    expect(box).toHaveStyle({ opacity: '0.4' })

    // Opacity returns on dragend
    fireEvent.dragEnd(box)
    expect(box).toHaveStyle({ opacity: '1' })
  })
})
