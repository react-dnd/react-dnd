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
          Several different dustbins can handle several types of items. Note that the last dustbin is special: it can handle files from your hard drive and URLs.
        </p>
      </div>
    );
  }
});

module.exports = DustbinSorted;