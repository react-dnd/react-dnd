'use strict';

var React = require('react'),
    OuterDustbin = require('./OuterDustbin'),
    InnerDustbin = require('./InnerDustbin'),
    makeItem = require('../_dustbin-interesting/makeItem'),
    ItemTypes = require('./ItemTypes'),
    { NativeDragItemTypes } = require('react-dnd');

var Container = React.createClass({
  renderItem(name, dropType) {
    var Item = makeItem(dropType);
    return <Item name={name} />;
  },

  render() {
    return (
      <div>
        <div style={{minHeight: '14rem', overflow: 'auto'}}>
          <OuterDustbin>
            <InnerDustbin />
          </OuterDustbin>

          <OuterDustbin checkIsHandled
                        stopDeepHover>
            <InnerDustbin />
          </OuterDustbin>
        </div>

        <div style={{ minHeight: '2rem' }}>
          {this.renderItem('Glass', ItemTypes.GLASS)}
        </div>
      </div>
    );
  }
});

module.exports = Container;
