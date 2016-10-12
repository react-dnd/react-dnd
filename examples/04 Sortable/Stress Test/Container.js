import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { name } from 'faker';
import Card from './Card';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';

const style = {
  width: 400
};

const parentTarget = {
  hover(props, monitor, component) {
    const cancelAnimationFrame = window.cancelAnimationFrame || (timeout => clearTimeout(timeout));
    const requestAnimationFrame = window.requestAnimationFrame || (func => setTimeout(func, 1000 / 60));

    // If already scrolling, stop the previous scroll loop
    if (this.lastScroll) {
      cancelAnimationFrame(this.lastScroll);
      this.lastScroll = null;
      clearTimeout(this.removeTimeout);
    }

    const bufferHeight = 120;
    const dragYOffset = monitor.getClientOffset().y;
    const { top: containerTop, bottom: containerBottom } = component.container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let scrollDirection = 0;
    let scrollMagnitude = 0;
    const fromTop = dragYOffset - bufferHeight - Math.max(containerTop, 0);
    if (fromTop <= 0) {
      // Move up
      scrollDirection = -1;
      scrollMagnitude = Math.ceil(Math.sqrt(-1 * fromTop));
    } else {
      const fromBottom = dragYOffset + bufferHeight - Math.min(containerBottom, windowHeight);
      if (fromBottom >= 0) {
        // Move down
        scrollDirection = 1;
        scrollMagnitude = Math.ceil(Math.sqrt(fromBottom));
      } else {
        // If neither near the top nor bottom, skip calling the scrolling function
        return;
      }
    }

    // Indefinitely scrolls the window down at a constant rate
    const doScroll = () => {
      scrollBy(0, scrollDirection * scrollMagnitude);
      this.lastScroll = requestAnimationFrame(doScroll);
    };

    // Stop the scroll loop after a period of inactivity
    this.removeTimeout = setTimeout(() => {
      cancelAnimationFrame(this.lastScroll);
      this.lastScroll = null;
    }, 100);

    // Start the scroll loop
    this.lastScroll = requestAnimationFrame(doScroll);
  },

  drop() {
    if (this.lastScroll) {
      const cancelAnimationFrame = window.cancelAnimationFrame || (timeout => clearTimeout(timeout));
      cancelAnimationFrame(this.lastScroll);
      this.lastScroll = null;
      clearTimeout(this.removeTimeout);
    }
  }
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, parentTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.moveCard = this.moveCard.bind(this);
    this.drawFrame = this.drawFrame.bind(this);

    const cardsById = {};
    const cardsByIndex = [];

    for (let i = 0; i < 1000; i++) {
      const card = { id: i, text: name.findName() };
      cardsById[card.id] = card;
      cardsByIndex[i] = card;
    }

    this.state = {
      cardsById,
      cardsByIndex
    };
  }

  moveCard(id, afterId) {
    const { cardsById, cardsByIndex } = this.state;

    const card = cardsById[id];
    const afterCard = cardsById[afterId];

    const cardIndex = cardsByIndex.indexOf(card);
    const afterIndex = cardsByIndex.indexOf(afterCard);

    this.scheduleUpdate({
      cardsByIndex: {
        $splice: [
          [cardIndex, 1],
          [afterIndex, 0, card]
        ]
      }
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.requestedFrame);
  }

  scheduleUpdate(updateFn) {
    this.pendingUpdateFn = updateFn;

    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame);
    }
  }

  drawFrame() {
    const nextState = update(this.state, this.pendingUpdateFn);
    this.setState(nextState);

    this.pendingUpdateFn = null;
    this.requestedFrame = null;
  }

  render() {
    const { cardsByIndex } = this.state;
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div
        style={style}
        ref={(el) => { this.container = el; }}
      >
        {cardsByIndex.map(card => {
          return (
            <Card key={card.id}
                  id={card.id}
                  text={card.text}
                  moveCard={this.moveCard} />
          );
        })}
      </div>
    );
  }
}