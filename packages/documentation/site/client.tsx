import * as React from 'react'
import * as ReactDOM from 'react-dom'
import IndexPage from './IndexPage'

const initialProps: any = (window as any).INITIAL_PROPS
ReactDOM.render(<IndexPage {...initialProps} /> as any, document as any)
