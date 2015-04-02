'use strict';

import React, { Component } from 'react';
import update from 'react/lib/update';
import range from 'lodash/utility/range';
import { name } from 'faker';
import Card from './Card';
import { configureDragDropContext, HTML5Backend } from 'react-dnd';

class Container extends Component {
  constructor(props) {
    super(props);

    this.moveCard = this.moveCard.bind(this);
    this.applyNextState = this.applyNextState.bind(this);

    this.state = {
      cards: range(1000).map(i => ({
        id: i,
        text: name.findName()
      }))
    };
  }

  moveCard(id, afterId) {
    const { cards } = this.state;

    const card = cards.filter(c => c.id === id)[0];
    const afterCard = cards.filter(c => c.id === afterId)[0];
    const cardIndex = cards.indexOf(card);
    const afterIndex = cards.indexOf(afterCard);

    this.nextState = update(this.state, {
      cards: {
        $splice: [
          [cardIndex, 1],
          [afterIndex, 0, card]
        ]
      }
    });

    if (!this.frame) {
      this.frame = requestAnimationFrame(this.applyNextState);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
  }

  applyNextState() {
    this.setState(this.nextState);
    this.frame = null;
  }

  render() {
    const { cards } = this.state;

    return (
      <div>
        {cards.map(card => {
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

export default configureDragDropContext(Container, {
  backend: HTML5Backend
});