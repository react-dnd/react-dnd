
	import React from 'react'
	import ReactDOM from 'react-dom'
	import Example from './example'
	import { DragDropContextProvider } from 'react-dnd'
	import HTML5Backend from 'react-dnd-html5-backend'
	
	function App() {
		return (
			<div className="App">
				<DragDropContextProvider backend={HTML5Backend}>
					<Example />
				</DragDropContextProvider>
			</div>
		)
	}
	
	const rootElement = document.getElementById('root')
	ReactDOM.render(<App />, rootElement)	
