import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import wrapInTestContext from '../../../shared/wrapInTestContext';
import expect from 'expect';
import Box from '../Box';

describe('Box', () => {
  it('can be tested independently', () => {
    // Obtain the reference to the component before React DnD wrapping
    const OriginalBox = Box.DecoratedComponent;

    // Stub the React DnD connector functions with an identity function
    const identity = x => x;

    // Render with one set of props and test
    let root = TestUtils.renderIntoDocument(
      <OriginalBox name='test'
                   connectDragSource={identity}
                   isDragging={false} />
    );
    let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.style.opacity).toEqual('1');

    // Render with another set of props and test
    root = TestUtils.renderIntoDocument(
      <OriginalBox name='test'
                   connectDragSource={identity}
                   isDragging />
    );
    div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.style.opacity).toEqual('0.4');
  });

  it('can be tested with the testing backend', () => {
    // Render with the testing backend
    const BoxContext = wrapInTestContext(Box);
    const root = TestUtils.renderIntoDocument(<BoxContext name='test' />);

    // Obtain a reference to the backend
    const backend = root.getManager().getBackend();

    // Check that the opacity is 1
    let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.style.opacity).toEqual('1');

    // Find the drag source ID and use it to simulate the dragging state
    const box = TestUtils.findRenderedComponentWithType(root, Box);
    backend.simulateBeginDrag([box.getHandlerId()]);

    // Verify that the div changed its opacity
    div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.style.opacity).toEqual('0.4');
  });
});
