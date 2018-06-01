import * as React from 'react'
import Header from '../components/Header'
import PageBody from '../components/PageBody'
import StaticHTMLBlock from '../components/StaticHTMLBlock'
const IndexHTML = require('../../docs/index.md')

export default class HomePage extends React.Component {
	public render() {
		return (
			<div>
				<Header />
				<PageBody hasSidebar={false}>
					<StaticHTMLBlock html={IndexHTML} />
				</PageBody>
			</div>
		)
	}
}
