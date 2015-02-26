'use strict';

var React = require('react'),
    Container = require('./Container');

var DustbinNested = React.createClass({
  render() {
    return (
      <div>
        <Container />
        <hr />
        <p>
          Showcase how dropzones can react on hover
        </p>
      </div>
    );
  }
});

module.exports = DustbinNested;