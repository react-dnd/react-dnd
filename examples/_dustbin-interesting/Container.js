'use strict';

import React, { Component } from 'react';
import { configureDragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd/modules/backends/HTML5';
import Dustbin from './Dustbin';
import Box from './Box';
import ItemTypes from './ItemTypes';
import shuffle from 'lodash/collection/shuffle';
import update from 'react/lib/update';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [
        { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
        { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
        { accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL], lastDroppedItem: null },
        { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null }
      ],
      boxes: [
        { name: 'Bottle', type: ItemTypes.GLASS },
        { name: 'Banana', type: ItemTypes.FOOD },
        { name: 'Magazine', type: ItemTypes.PAPER }
      ],
      droppedBoxNames: []
    };
  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }

  render() {
    const { boxes, dustbins } = this.state;

    return (
      <div>
        <div style={{minHeight: '14rem'}}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) =>
            <Dustbin accepts={accepts}
                     lastDroppedItem={lastDroppedItem}
                     onDrop={(item) => this.handleDrop(index, item)}
                     key={index} />
          )}
        </div>

        <div style={{ minHeight: '2rem' }}>
          {boxes.map(({ name, type }, index) =>
            <Box name={name}
                 type={type}
                 isDropped={this.isDropped(name)}
                 key={index} />
          )}
        </div>
      </div>
    );
  }

  handleDrop(index, item) {
    const { name } = item;

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item
          }
        }
      },
      droppedBoxNames: name ? {
        $push: [name]
      } : {}
    }));
  }
}

export default configureDragDropContext(Container, HTML5Backend);