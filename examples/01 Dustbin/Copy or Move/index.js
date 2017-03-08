import React, { Component } from 'react';
import Container from './Container';

export default class DustbinCopyOrMove extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href="https://github.com/react-dnd/react-dnd/tree/master/examples/01%20Dustbin/Copy%20or%20Move">Browse the Source</a></b>
        </p>
        <p>
          This example demonstrates drop targets that can accept copy and move drop effects, which users can switch between by holding down or releasing the alt key as they drag.
        </p>
        <p>
          In a todo list app, for example, the default drag and drop operation could be used to sort the list, while holding down the alt key while dragging and dropping could copy the todo item to the drop target instead of moving it.
        </p>
        <Container />
      </div>
    );
  }
}
