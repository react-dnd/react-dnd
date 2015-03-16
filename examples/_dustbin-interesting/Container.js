'use strict';

import React, { createClass } from 'react';
import Dustbin from './Dustbin';
import Box from './Box';
import ItemTypes from './ItemTypes';
import { DragDropContext, HTML5Backend } from 'react-dnd';

const Container = createClass({
  mixins: [DragDropContext({
    dragDrop: HTML5Backend
  })],

  render() {
    return (
      <div>
        <div style={{minHeight: '14rem'}}>
          <Dustbin types={[ItemTypes.GLASS]} />
          <Dustbin types={[ItemTypes.FOOD]} />
          <Dustbin types={[ItemTypes.PAPER]} />
          {/*
          {this.renderDustbin([NativeDragItemTypes.FILE, NativeDragItemTypes.URL])}
          */}
        </div>

        <div style={{ minHeight: '2rem' }}>
          <Box name='Box' type={ItemTypes.GLASS} />
          <Box name='Banana' type={ItemTypes.FOOD} />
          <Box name='Bottle' type={ItemTypes.GLASS} />
          <Box name='Burger' type={ItemTypes.FOOD} />
          <Box name='Paper' type={ItemTypes.PAPER} />
        </div>
      </div>
    );
  }
});

export default Container;
