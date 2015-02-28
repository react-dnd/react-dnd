'use strict';

var React = require('react'),
    Dustbin = require('./Dustbin'),
    Box = require('./Box'),
    ItemTypes = require('./ItemTypes'),
    { NativeDragItemTypes } = require('react-dnd');

var Container = React.createClass({
  render() {
    return (
      <div>
        <div style={{minHeight: '14rem', overflow: 'auto'}}>
          <Dustbin greedy>
            <Dustbin greedy>
              <Dustbin greedy>
                <Dustbin greedy />
              </Dustbin>
            </Dustbin>
          </Dustbin>

          <Dustbin>
            <Dustbin>
              <Dustbin>
                <Dustbin />
              </Dustbin>
            </Dustbin>
          </Dustbin>
        </div>

        <div style={{ minHeight: '2rem' }}>
          <Box />
        </div>
      </div>
    );
  }
});

module.exports = Container;
