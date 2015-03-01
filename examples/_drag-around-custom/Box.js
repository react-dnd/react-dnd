'use strict';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem',
  display: 'inline-block'
};

const Box = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    title: PropTypes.string.isRequired
  },

  render() {
    const { title } = this.props;

    return (
      <div style={styles}>
        {title}
      </div>
    );
  }
});

export default Box;