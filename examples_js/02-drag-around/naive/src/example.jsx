import React, { useState, useCallback } from 'react'
import Container from './Container'
const DragAroundNaive = () => {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const handleHideSourceClick = useCallback(() => {
    setHideSourceOnDrag(!hideSourceOnDrag)
  }, [hideSourceOnDrag])
  return (
    <div>
      <Container hideSourceOnDrag={hideSourceOnDrag} />
      <p>
        <label htmlFor="hideSourceOnDrag">
          <input
            id="hideSourceOnDrag"
            type="checkbox"
            checked={hideSourceOnDrag}
            onChange={handleHideSourceClick}
          />
          <small>Hide the source item while dragging</small>
        </label>
      </p>
    </div>
  )
}
export default DragAroundNaive
