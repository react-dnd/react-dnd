import * as React from 'react'
import * as ReactDOM from 'react-dom'
import IndexPage from './IndexPage'

const initialProps: any = (window as any).INITIAL_PROPS
ReactDOM.hydrate(
	<React.StrictMode>
		<IndexPage {...initialProps} />
	</React.StrictMode>,
	document as any,
)
