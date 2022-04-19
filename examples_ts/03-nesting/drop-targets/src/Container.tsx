import type { FC } from 'react'

import { Box } from './Box'
import { Dustbin } from './Dustbin'

export const Container: FC = () => (
  <div>
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
      <Dustbin greedy={true}>
        <Dustbin greedy={true}>
          <Dustbin greedy={true} />
        </Dustbin>
      </Dustbin>
      <Dustbin>
        <Dustbin>
          <Dustbin />
        </Dustbin>
      </Dustbin>
    </div>

    <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
      <Box />
    </div>
  </div>
)
