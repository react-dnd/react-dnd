
	import React from 'react'
	import ReactDOM from 'react-dom'
	import Example from './example'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'

	function App() {
		return (
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<Example />
				</DndProvider>
			</div>
		)
	}

	const rootElement = document.getElementById('root')
	ReactDOM.render(<App />, rootElement)
