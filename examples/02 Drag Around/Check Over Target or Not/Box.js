import React, { Component } from 'react';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
  textAlign: 'center'
};

export default class Box extends Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <div style={{ ...style }}>
        {this.props.children}
      </div>
    );
  }
}