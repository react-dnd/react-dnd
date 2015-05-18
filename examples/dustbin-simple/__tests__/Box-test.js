import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import wrapInTestContext from '../../shared/wrapInTestContext';
import expect from 'expect';
import Box from '../Box';

describe('Box', () => {
  it('changes opacity when dragged', () => {
    const BoxContext = wrapInTestContext(Box);

    const root = TestUtils.renderIntoDocument(<BoxContext name='test' />);
    const backend = root.getManager().getBackend();

    let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.props.style.opacity).toEqual(1);

    const box = TestUtils.findRenderedComponentWithType(root, Box);
    backend.simulateBeginDrag([box.getHandlerId()]);

    div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.props.style.opacity).toEqual(0.4);
  });
});