'use strict';

var React = require('react'),
    makeDustbin = require('./Dustbin'),
    makeItem = require('./Item'),
    ItemTypes = require('./ItemTypes'),
    { NativeDragItemTypes, DragDropMixin } = require('react-dnd');

var InnerContainer = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(registerType) {
      registerType(ItemTypes.PAPER, {
        dropTarget: {
        }
      });
    }
  },

  render() {
    var dropStates = [ItemTypes.PAPER].map(this.getDropState),
        backgroundColor = 'red';

    if (dropStates.some(s => s.isOverCurrent)) {
      backgroundColor = 'blue';
    } else if (dropStates.some(s => s.isDragging)) {
      backgroundColor = 'yellow';
    }

    return (
      <div style={{backgroundColor: backgroundColor, overflow: 'hidden'}}
           {...this.dropTargetFor.apply(this, [ItemTypes.PAPER])}>
        {this.props.children}
      </div>
    );
  }
});

var Container = React.createClass({
  renderDustbin(accepts) {
    var Dustbin = makeDustbin(accepts);
    return <Dustbin/>;
  },

  renderItem(name, dropType) {
    var Item = makeItem(dropType);
    return <Item name={name}/>;
  },

  render() {
    return (
      <div>
        <div style={{minHeight: '14rem'}}>
          <InnerContainer>
            {this.renderDustbin([ItemTypes.GLASS])}
            {this.renderDustbin([ItemTypes.FOOD])}
            {this.renderDustbin([ItemTypes.PAPER])}
            {this.renderDustbin([ItemTypes.PAPER, NativeDragItemTypes.FILE])}
          </InnerContainer>
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
