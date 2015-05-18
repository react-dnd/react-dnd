import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem',
  display: 'inline-block'
};

export default class Box {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { title } = this.props;

    return (
      <div style={styles}>
        {title}
      </div>
    );
  }
}