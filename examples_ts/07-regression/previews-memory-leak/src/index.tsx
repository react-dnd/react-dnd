
	import { render } from 'react-dom'
	import { Example } from './Example'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
	import { Profiler } from './Profiler'

	function App() {
		return (
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<Example />
					<Profiler />
				</DndProvider>
			</div>
		)
	}

	const rootElement = document.getElementById('root')
	render(<App />, rootElement)
