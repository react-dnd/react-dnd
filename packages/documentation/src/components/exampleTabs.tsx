import React, { useState, useCallback, useMemo } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { componentIndex as decoratorComponentIndex } from 'react-dnd-examples-decorators/lib/esm/index'
import { componentIndex as hookComponentIndex } from 'react-dnd-examples-hooks/lib/esm/index'

export interface ExampleTabsProps {
	name: string
	component: string
}

const frameStyle: React.CSSProperties = {
	width: '100%',
	height: 800,
	border: 0,
	borderRadius: 4,
	overflow: 'hidden',
}

const tsUrl = (name: string, mode: 'decorators' | 'hooks') =>
	`https://codesandbox.io/embed/github/react-dnd/react-dnd/tree/gh-pages/examples_${mode}_ts/${name}?fontsize=14`
const jsUrl = (name: string, mode: 'decorators' | 'hooks') =>
	`https://codesandbox.io/embed/github/react-dnd/react-dnd/tree/gh-pages/examples_${mode}_js/${name}?fontsize=14`

const ExampleTabs: React.FC<ExampleTabsProps> = ({ name, component }) => {
	const [showHooks, setShowHooks] = useState(true)
	const ExampleComponent = showHooks
		? hookComponentIndex[component]
		: decoratorComponentIndex[component]
	const mode = useMemo(() => (showHooks ? 'hooks' : 'decorators'), [showHooks])

	return (
		<Tabs>
			<TabList>
				<Tab>Example</Tab>
				<Tab>JavaScript</Tab>
				<Tab>TypeScript</Tab>
			</TabList>
			<TabPanel>
				<div style={{ height: '100%', width: '100%', position: 'relative' }}>
					<button
						style={{
							top: 0,
							right: 0,
							position: 'absolute',
							backgroundColor: 'transparent',
							border: '0.5 px solid lightgrey',
							fontWeight: 300,
							borderRadius: 5,
						}}
						onClick={useCallback(() => setShowHooks(!showHooks), [
							showHooks,
							setShowHooks,
						])}
					>
						{showHooks ? 'Using Hooks' : 'Using Decorators'}
					</button>
					<ExampleComponent />
				</div>
			</TabPanel>
			<TabPanel>
				<iframe
					src={jsUrl(name, mode)}
					style={frameStyle}
					sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
				/>
			</TabPanel>
			<TabPanel>
				<iframe
					src={tsUrl(name, mode)}
					style={frameStyle}
					sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
				/>
			</TabPanel>
		</Tabs>
	)
}

export default ExampleTabs
