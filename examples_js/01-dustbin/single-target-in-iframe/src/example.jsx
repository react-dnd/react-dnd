import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from '../single-target/Dustbin'
import Box from '../single-target/Box'
import { isDebugMode } from '../../isDebugMode'
const {
  default: Frame,
  FrameContextConsumer,
} = require('react-frame-component')
const FrameBindingContext = ({ children }) => (
  <FrameContextConsumer>
    {({ window }) => (
      <DragDropContextProvider
        backend={HTML5Backend}
        context={window}
        debugMode={isDebugMode()}
      >
        {children}
      </DragDropContextProvider>
    )}
  </FrameContextConsumer>
)
// Don't use the decorator, embed the DnD context within the iframe
const Container = () => (
  // The react-frame-component will pass the iframe's 'window' global as a context value
  // to the DragDropContext provider. You could also directly inject it in via a prop.
  // If neither the prop or the context value for 'window' are present, the DragDropContextProvider
  // will just use the global window.
  <Frame style={{ width: '100%', height: 400 }}>
    <FrameBindingContext>
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
    </FrameBindingContext>
  </Frame>
)
export default Container
