'use strict';

var React = require('react'),
    Box = require('./Box'),
    { PureRenderMixin } = require('react/addons'),
    { PropTypes } = React;

var styles = {
  boxDragPreview: (props, state) => ({
    backgroundColor: state.tickTock ? 'white' : 'yellow',
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)'
  })
};

var BoxDragPreview = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    title: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      tickTock: false
    };
  },

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        tickTock: !this.state.tickTock
      });
    }, 500);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    var { title } = this.props;

    return (
      <div style={styles.boxDragPreview(this.props, this.state)}>
        <Box title={title} />
      </div>
    );
  }
});

module.exports = BoxDragPreview;
