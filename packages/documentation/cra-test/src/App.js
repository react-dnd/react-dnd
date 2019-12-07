import React, { memo, useState, useMemo, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { componentIndex } from 'react-dnd-examples-hooks'
import { Backend } from 'react-dnd-html5-backend'
import './App.css'

const exampleNames = Object.keys(componentIndex)

const App = memo(() => (
	<DndProvider backend={Backend}>
		<AppGuts />
	</DndProvider>
))
App.displayName = 'App'
export default App

function AppGuts() {
	const [name, setName] = useState('chessboard')
	const Example = useMemo(() => componentIndex[name], [name])

	return (
		<div className="App">
			<select
				onChange={useCallback(evt => setName(evt.target.value), [setName])}
			>
				{exampleNames.map(n => (
					<option key={n} value={n}>
						{n}
					</option>
				))}
			</select>
			<Example />
		</div>
	)
}
