'use strict';

var React = require('react'),
    { PropTypes } = React;

var styles = {
  box: {
    border: '1px dashed gray',
    padding: '0.5rem',
    display: 'inline-block'
  }
};

var Box = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired
  },

  render() {
    return (
      <div style={styles.box}>
        {this.props.title}
      </div>
    );
  }
});

module.exports = Box;
