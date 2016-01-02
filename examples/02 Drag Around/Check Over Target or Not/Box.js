import React, { Component, PropTypes } from 'react';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
  textAlign: 'center'
};

export default class Box extends Component {

  render() {
    return (
      <div style={{ ...style }}>
        {this.props.children}
      </div>
    );
  }
}