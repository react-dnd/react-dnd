'use strict';

var React = require('react'),
    makeSource = require('./makeSource'),
    Colors = require('./Colors'),
    Target = require('./Target');

var Container = React.createClass({
  render() {
    var Yellow = makeSource(Colors.YELLOW),
        BlueSource = makeSource(Colors.BLUE);

    return (
      <div style={{ height: 320 }}>
        <div style={{ float: 'left' }}>
          <BlueSource>
            <Yellow>
              <Yellow />
              <BlueSource />
            </Yellow>
            <BlueSource>
              <Yellow />
            </BlueSource>
          </BlueSource>
        </div>

        <div style={{ float: 'left', marginLeft: 100, marginTop: 50 }}>
          <Target />
        </div>
      </div>
    );
  }
});

module.exports = Container;