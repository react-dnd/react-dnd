'use strict';

var React = require('react'),
    { PureRenderMixin } = require('react/addons'),
    { PropTypes } = React;

var styles = {
  box: {
    border: '1px dashed gray',
    padding: '0.5rem',
    display: 'inline-block'
  }
};

var Box = React.createClass({
  mixins: [PureRenderMixin],

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
