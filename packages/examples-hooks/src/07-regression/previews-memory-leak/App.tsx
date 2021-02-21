import { FC } from 'react'
import { Example } from './example'
import { Profiler } from './Profiler'

export const App: FC = () => {
	return (
		<div className="App">
			<Example />
			<Profiler />
		</div>
	)
}
