/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Dustbin = require('./Dustbin'),
    Item = require('./Item');

var Container = React.createClass({
  render() {
    return (
      <div>
        <Dustbin />
        <div style={{ marginTop: '2rem' }}>
          <Item name='Glass' />
          <Item name='Banana' />
          <Item name='Paper' />
        </div>
      </div>
    );
  }
});

module.exports = Container;