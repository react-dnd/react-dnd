'use strict';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import Box from './Box';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

const BoxDragPreview = React.createClass({
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
    const { title } = this.props;
    const { tickTock } = this.state;
    const backgroundColor = tickTock ? 'white' : 'yellow';

    return (
      <div style={{
        ...styles,
        backgroundColor
      }}>
        <Box title={title} />
      </div>
    );
  }
});

export default BoxDragPreview;