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

  getInitialState() {
    return {
      tick: true
    };
  },

  componentDidMount() {
    this.interval = setInterval(() => this.tickTock(), 1000);
  },

  tickTock() {
    this.setState({
      tick: !this.state.tick
    });
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    const { tick } = this.state;

    return (
      <div>
        <div style={{minHeight: '14rem'}}>
          <Dustbin accepts={tick ? [ItemTypes.GLASS] : [ItemTypes.FOOD]} />
          <Dustbin accepts={tick ? [ItemTypes.FOOD] : [ItemTypes.PAPER]} />
          <Dustbin accepts={tick ? [ItemTypes.PAPER] : [ItemTypes.GLASS]} />
          {/*
          {this.renderDustbin([NativeDragItemTypes.FILE, NativeDragItemTypes.URL])}
          */}
        </div>

        <div style={{ minHeight: '2rem' }}>
          <Box name='Glass' type={ItemTypes.GLASS} />
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
