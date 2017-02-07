import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Frame from 'react-frame-component';
import Dustbin from '../Single Target/Dustbin';
import Box from '../Single Target/Box';

// Don't use the decorator, embed the DnD context within the iframe
export default class Container extends Component {
  render() {
    // The react-frame-component will pass the iframe's 'window' global as a context value
    // to the DragDropContext provider. You could also directly inject it in via a prop.
    // If neither the prop or the context value for 'window' are present, the DragDropContextProvider
    // will just use the global window.
    return (
      <Frame style={{ width: '100%', height: '100%' }}>
        <DragDropContextProvider backend={HTML5Backend}>
          <div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
              <Dustbin />
            </div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
              <Box name="Glass" />
              <Box name="Banana" />
              <Box name="Paper" />
            </div>
          </div>
        </DragDropContextProvider>
      </Frame>
    );
  }
}
