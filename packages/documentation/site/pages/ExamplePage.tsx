import React from 'react'
import Header from '../components/Header'
import PageBody from '../components/PageBody'
import SideBar from '../components/SideBar'
import { ExamplePages, Page } from '../Constants'

export interface ExamplePagesProps {
	example: Page
}

export default class ExamplesPage extends React.Component<ExamplePagesProps> {
	public render() {
		return (
			<div>
				<Header />
				<PageBody hasSidebar={true}>
					<SideBar groups={ExamplePages} example={this.props.example} />

					{this.props.children}
				</PageBody>
			</div>
		)
	}
}
