'use strict';

var React = require('react'),
    Card = require('./Card'),
    update = require('react/lib/update');

var Container = React.createClass({
  getInitialState() {
    return {
      cards: [{
        id: 1,
        text: 'Write a cool JS library'
      }, {
        id: 2,
        text: 'Make it generic enough'
      }, {
        id: 3,
        text: 'Write README'
      }, {
        id: 4,
        text: 'Create some examples'
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it'
      }, {
        id: 6,
        text: '???'
      }, {
        id: 7,
        text: 'PROFIT'
      }]
    };
  },

  moveCard(id, afterId) {
    var card = this.state.cards.filter(c => c.id === id)[0],
        afterCard = this.state.cards.filter(c => c.id === afterId)[0],
        cardIndex = this.state.cards.indexOf(card),
        afterIndex = this.state.cards.indexOf(afterCard);

    var stateUpdate = {
      cards: {
        $splice: [
          [cardIndex, 1],
          [afterIndex, 0, card]
        ]
      }
    };

    this.setState(update(this.state, stateUpdate));
  },

  render() {
    return (
      <div>
        {this.state.cards.map(card => {
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
});

module.exports = Container;