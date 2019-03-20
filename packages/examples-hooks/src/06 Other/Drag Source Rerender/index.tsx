import * as React from 'react'
import Example from './Example'

const Container: React.FC = () => {
	return (
		<>
			<h1>EXPERIMENTAL API</h1>
			<h1>
				Drag the box before hiding then hide it and show it again and try again.
			</h1>
			<Example />
		</>
	)
}
export default Container
