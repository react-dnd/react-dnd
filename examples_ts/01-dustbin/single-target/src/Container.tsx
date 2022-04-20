import type { FC } from 'react'
import { memo } from 'react'

import { Box } from './Box'
import { Dustbin } from './Dustbin'

export const Container: FC = memo(function Container() {
  return (
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
  )
})
