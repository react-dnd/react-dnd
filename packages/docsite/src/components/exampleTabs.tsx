import 'react-tabs/style/react-tabs.css'

import { CSSProperties, FC, memo } from 'react'
import { componentIndex } from 'react-dnd-examples'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

export interface ExampleTabsProps {
	name: string
	component: string
}

const frameStyle: CSSProperties = {
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

export const ExampleTabs: FC<ExampleTabsProps> = memo(function ExampleTabs({
	name,
	component,
}) {
	const ExampleComponent =
		componentIndex[component] ||
		// fallback to error
		(() => <NotFound name={component} />)
	return (
		<Tabs>
			<TabList>
				<Tab>Example</Tab>
				<Tab>JavaScript</Tab>
				<Tab>TypeScript</Tab>
			</TabList>
			<TabPanel>
				<ExampleComponent />
			</TabPanel>
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
})

interface NotFoundProps {
	name: string
}
const NotFound: FC<NotFoundProps> = ({ name }) => {
	return <div>Error: could not find example {name}</div>
}
