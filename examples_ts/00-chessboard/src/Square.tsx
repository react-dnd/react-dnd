import type { FC, ReactNode } from 'react'

export interface SquareProps {
  black: boolean
  children?: ReactNode
}

const squareStyle = {
  width: '100%',
  height: '100%',
}

export const Square: FC<SquareProps> = ({ black, children }) => {
  const backgroundColor = black ? 'black' : 'white'
  const color = black ? 'white' : 'black'
  return (
    <div
      style={{
        ...squareStyle,
        color,
        backgroundColor,
      }}
    >
      {children}
    </div>
  )
}
