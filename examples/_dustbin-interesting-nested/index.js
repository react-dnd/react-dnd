'use strict';

var React = require('react'),
    Container = require('./Container');

var DustbinSorted = React.createClass({
  render() {
    return (
      <div>
        <Container />
        <hr />
        <p>
          Several different dustbins can handle several types of items. Note that the last dustbin is special: it can also handle files from your hard drive.
        </p>
      </div>
    );
  }
});

module.exports = DustbinSorted;