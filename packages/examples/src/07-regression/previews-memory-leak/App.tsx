import type { FC } from 'react'

import { Example } from './example.js'
import { Profiler } from './Profiler.js'

export const App: FC = () => {
	return (
		<div className="App">
			<Example />
			<Profiler />
		</div>
	)
}
