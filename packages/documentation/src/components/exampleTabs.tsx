import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

export interface ExampleTabsProps {
	name: string
}

const frameStyle: React.CSSProperties = {
	width: '100%',
	height: 800,
	border: 0,
	borderRadius: 4,
	overflow: 'hidden',
}

const tsUrl = (name: string) =>
	`https://codesandbox.io/embed/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/${name}?fontsize=14`
const jsUrl = (name: string) =>
	`https://codesandbox.io/embed/github/react-dnd/react-dnd/tree/gh-pages/examples_js/${name}?fontsize=14`

const ExampleTabs: React.FC<ExampleTabsProps> = ({ name, children }) => {
	return (
		<Tabs>
			<TabList>
				<Tab>Example</Tab>
				<Tab>JavaScript</Tab>
				<Tab>TypeScript</Tab>
			</TabList>
			<TabPanel>{children}</TabPanel>
			<TabPanel>
				<iframe
					src={jsUrl(name)}
					style={frameStyle}
					sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
				/>
			</TabPanel>
			<TabPanel>
				<iframe
					src={tsUrl(name)}
					style={frameStyle}
					sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
				/>
			</TabPanel>
		</Tabs>
	)
}

export default ExampleTabs
