'use strict';

import React, { PropTypes, Component } from 'react';
import Dustbin from './Dustbin';
import Box from './Box';
import ItemTypes from './ItemTypes';
import { HTML5Backend } from 'react-dnd';
import { DragDropManager } from 'dnd-core';

const manager = new DragDropManager(HTML5Backend);

const childContextTypes = {
  dnd: PropTypes.object.isRequired
};

export default class Container extends Component {
  getChildContext() {
    return {
      dnd: manager
    };
  }

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
}

Container.childContextTypes = childContextTypes;
