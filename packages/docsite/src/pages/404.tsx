import { FC, memo } from 'react'

import { Layout } from '../components/layout'

/**
 * TODO: Add some fancy drag/droppable stuff here
 */
const NotFoundPage: FC = memo(function NotFoundPage() {
	return (
		<Layout hideSidebar={true}>
			<h1>NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</Layout>
	)
})

export default NotFoundPage
