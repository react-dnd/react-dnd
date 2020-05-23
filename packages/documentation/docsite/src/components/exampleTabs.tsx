import React, { memo, useState, useCallback, useMemo } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'
import 'react-tabs/style/react-tabs.css'
import { componentIndex as decoratorComponentIndex } from 'react-dnd-examples-decorators'
import { componentIndex as hookComponentIndex } from 'react-dnd-examples-hooks'

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

export const ExampleTabs: React.FC<ExampleTabsProps> = memo(
	function ExampleTabs({ name, component }) {
		const [showHooks, setShowHooks] = useState(true)
		const hookComponent = hookComponentIndex[component]
		const decoratorComponent = decoratorComponentIndex[component]
		const ExampleComponent =
			// use the selected component
			(showHooks ? hookComponent : decoratorComponent) ||
			// fall back to other impl
			(showHooks ? decoratorComponent : hookComponent) ||
			// final fallback to error
			(() => <NotFound name={component} />)
		const mode = useMemo(() => (showHooks ? 'hooks' : 'decorators'), [
			showHooks,
		])
		const showHooksVisible = !!hookComponent && !!decoratorComponent

		return (
			<Tabs>
				<TabList>
					<Tab>Example</Tab>
					<Tab>JavaScript</Tab>
					<Tab>TypeScript</Tab>
				</TabList>
				<TabPanel>
					<Panel>
						{!showHooksVisible ? null : (
							<ShowHooksButton
								onClick={useCallback(() => setShowHooks(!showHooks), [
									showHooks,
									setShowHooks,
								])}
							>
								{showHooks ? 'Using Hooks' : 'Using Decorators'}
							</ShowHooksButton>
						)}
						<ExampleComponent />
					</Panel>
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
	},
)

interface NotFoundProps {
	name: string
}
const NotFound: React.FC<NotFoundProps> = ({ name }) => {
	return <div>Error: could not find example {name}</div>
}

const Panel = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
`

const ShowHooksButton = styled.button`
	top: 0;
	right: 0;
	position: absolute;
	background-color: transparent;
	border: 0.5px solid lightgrey;
	font-weight: 300;
	border-radius: 5px;
`
