import * as React from 'react'
import Layout from '../components/layout'
import { DragDropContextProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const NotFoundPage: React.SFC = () => (
	<Layout hideSidebar={true}>
		<DragDropContextProvider backend={Backend}>
			<h1>NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</DragDropContextProvider>
	</Layout>
)

export default NotFoundPage
