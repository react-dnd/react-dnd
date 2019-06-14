import React, { useState, useEffect } from 'react'
import Container from './Container'
const SortableStressTest = () => {
  // Avoid rendering on server because the big data list is generated
  const [shouldRender, setShouldRender] = useState(false)
  useEffect(() => setShouldRender(true))
  return <>{shouldRender && <Container />}</>
}
export default SortableStressTest
