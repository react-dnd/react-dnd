import React from 'react'

import { Example } from './example'
import { Profiler } from './Profiler'

export const App: React.FC = () => {
	return (
		<div className="App">
			<Example />
			<Profiler />
		</div>
	)
}
