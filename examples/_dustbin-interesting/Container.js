'use strict';

import React from 'react';
import makeDustbin from './makeDustbin';
import makeItem from './makeItem';
import ItemTypes from './ItemTypes';
import { NativeDragItemTypes } from 'react-dnd';

const Container = React.createClass({
  renderDustbin(accepts) {
    const Dustbin = makeDustbin(accepts);
    return <Dustbin />;
  },

  renderItem(name, dropType) {
    const Item = makeItem(dropType);
    return <Item name={name} />;
  },

  render() {
    return (
      <div>
        <div style={{minHeight: '14rem'}}>
          {this.renderDustbin([ItemTypes.GLASS])}
          {this.renderDustbin([ItemTypes.FOOD])}
          {this.renderDustbin([ItemTypes.PAPER])}
          {this.renderDustbin([NativeDragItemTypes.FILE, NativeDragItemTypes.URL])}
        </div>

        <div style={{ minHeight: '2rem' }}>
          {this.renderItem('Glass', ItemTypes.GLASS)}
          {this.renderItem('Banana', ItemTypes.FOOD)}
          {this.renderItem('Bottle', ItemTypes.GLASS)}
          {this.renderItem('Burger', ItemTypes.FOOD)}
          {this.renderItem('Paper', ItemTypes.PAPER)}
        </div>
      </div>
    );
  }
});

export default Container;