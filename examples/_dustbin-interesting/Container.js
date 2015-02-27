'use strict';

var React = require('react'),
    makeDustbin = require('./makeDustbin'),
    makeItem = require('./makeItem'),
    ItemTypes = require('./ItemTypes'),
    { NativeDragItemTypes } = require('react-dnd');

var Container = React.createClass({
  renderDustbin(accepts) {
    var Dustbin = makeDustbin(accepts);
    return <Dustbin />;
  },

  renderItem(name, dropType) {
    var Item = makeItem(dropType);
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

module.exports = Container;
