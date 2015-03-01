'use strict';

import React from 'react';
import Dustbin from './Dustbin';
import Item from './Item';

const Container = React.createClass({
  render() {
    return (
      <div>
        <Dustbin />
        <div style={{ marginTop: '2rem' }}>
          <Item name='Glass' />
          <Item name='Banana' />
          <Item name='Paper' />
        </div>
      </div>
    );
  }
});

export default Container;