import { useState, useCallback } from 'react'
import { TargetBox } from './TargetBox.js'
import { HTMLContent } from './HTMLContent.js'
export const Container = () => {
  const [droppedHTML, setDroppedHTML] = useState('')
  const handleHTMLDrop = useCallback(
    (item) => {
      if (item) {
        setDroppedHTML(item.html)
      }
    },
    [setDroppedHTML],
  )
  return (
    <>
      <iframe
        srcDoc={`<img src='https://react-dnd.github.io/react-dnd/favicon-32x32.png' />`}
      />
      <TargetBox onDrop={handleHTMLDrop} />
      <HTMLContent html={droppedHTML} />
    </>
  )
}
