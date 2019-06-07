import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
const {
  default: Frame,
  FrameContextConsumer,
} = require('react-frame-component')
const FrameBindingContext = ({ children }) => (
  <FrameContextConsumer>
    {({ window }) => (
      <DragDropContextProvider backend={HTML5Backend} context={window}>
        {children}
      </DragDropContextProvider>
    )}
  </FrameContextConsumer>
)
// Don't use the decorator, embed the DnD context within the iframe
export default function Container() {
  // The react-frame-component will pass the iframe's 'window' global as a context value
  // to the DragDropContext provider. You could also directly inject it in via a prop.
  // If neither the prop or the context value for 'window' are present, the DragDropContextProvider
  // will just use the global window.
  return (
    <>
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
    </>
  )
}
