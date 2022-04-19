import './App.css'

import { memo, useCallback, useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { componentIndex } from 'react-dnd-examples'
import { HTML5Backend } from 'react-dnd-html5-backend'

const exampleNames = Object.keys(componentIndex)

const App = memo(() => (
	<DndProvider backend={HTML5Backend}>
		<AppGuts />
	</DndProvider>
))
App.displayName = 'App'

function AppGuts() {
	const [name, setName] = useState('chessboard')
	const Example = useMemo(() => componentIndex[name], [name])

	return (
		<div className="App">
			<select
				onChange={useCallback(
					(evt: React.ChangeEvent<HTMLSelectElement>) =>
						setName(evt.target.value),
					[setName],
				)}
			>
				{exampleNames.map((n) => (
					<option key={n} value={n}>
						{n}
					</option>
				))}
			</select>
			<Example />
		</div>
	)
}

export default App
