import React, { memo } from 'react'
import { Layout } from '../components/layout'
import { navigate } from 'gatsby'

const IndexPage: React.FC = memo(function IndexPage(props) {
	if (typeof window !== 'undefined') {
		navigate('/about')
	}
	return (
		<Layout {...props} hideSidebar={true}>
			{null}
		</Layout>
	)
})

export default IndexPage
