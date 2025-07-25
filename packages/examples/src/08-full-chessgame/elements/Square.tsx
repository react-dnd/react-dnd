import type { FC, ReactNode } from 'react'

export interface SquareProps {
	isPair: boolean, 
  children: ReactNode
}

export const Square:FC<SquareProps> = ({ isPair, children }) => {
  const fill = isPair ? "black" : "white"
  const stroke = isPair ? "white" : "black"

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  )
}
