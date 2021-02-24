import { act, fireEvent, render } from '@testing-library/react'
import Example from '../index'
import { wrapWithBackend, fireDragDrop } from 'react-dnd-test-utils'

describe('the drag sources example', () => {
  it('can drag and drop a box', async () => {
    const Wrapped = wrapWithBackend(Example)
    const rendered = render(<Wrapped />)

    const boxes = await rendered.findAllByRole('SourceBox')
    const target = await rendered.findByRole('TargetBox')
    const box3 = boxes[3]
    const box3Color = box3.attributes['data-color'].value
    await fireDragDrop(box3, target)
    expect(target.attributes['data-color'].value).toEqual(box3Color)
  })

  it('can prevent a drag-and-drop', async () => {
    const Wrapped = wrapWithBackend(Example)
    const rendered = render(<Wrapped />)

    const boxes = await rendered.findAllByRole('SourceBox')
    const target = await rendered.findByRole('TargetBox')
    const box3 = boxes[3]
    act(() => {
      fireEvent.click(box3.children[0])
    })
    const box3Color = box3.attributes['data-color'].value
    fireDragDrop(box3, target)
    expect(target.attributes['data-color'].value).not.toEqual(box3Color)
  })
})
