'use strict';

var React = require('react'),
    Dustbin = require('./Dustbin'),
    Item = require('./Item'),
    ItemTypes = require('./ItemTypes'),
    { NativeDragItemTypes } = require('react-dnd');

var Container = React.createClass({
  render() {
    return (
      <div>
        <div style={{minHeight: '14rem'}}>
          <Dustbin accepts={[ItemTypes.GLASS]} />
          <Dustbin accepts={[ItemTypes.FOOD]} />
          <Dustbin accepts={[ItemTypes.PAPER]} />
          <Dustbin accepts={[ItemTypes.PAPER, NativeDragItemTypes.FILE]} />
        </div>

        <div style={{ minHeight: '2rem' }}>
          <Item name='Glass' type={ItemTypes.GLASS} />
          <Item name='Banana' type={ItemTypes.FOOD} />
          <Item name='Bottle' type={ItemTypes.GLASS} />
          <Item name='Burger' type={ItemTypes.FOOD} />
          <Item name='Paper' type={ItemTypes.PAPER} />
        </div>
      </div>
    );
  }
});

module.exports = Container;