import { memo, useEffect, useState } from 'react'
import { Box } from './Box.js'
const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
}
export const BoxDragPreview = memo(function BoxDragPreview({ title }) {
  const [tickTock, setTickTock] = useState(false)
  useEffect(
    function subscribeToIntervalTick() {
      const interval = setInterval(() => setTickTock(!tickTock), 500)
      return () => clearInterval(interval)
    },
    [tickTock],
  )
  return (
    <div style={styles}>
      <Box title={title} yellow={tickTock} preview />
    </div>
  )
})
