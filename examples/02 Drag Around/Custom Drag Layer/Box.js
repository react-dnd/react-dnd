import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';

const styles = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
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