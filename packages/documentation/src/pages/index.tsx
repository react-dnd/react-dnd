import * as React from 'react'
import Layout from '../components/layout'
import { navigate } from 'gatsby'

const IndexPage: React.SFC = props => {
	navigate('/about')
	return (
		<Layout {...props} hideSidebar={true}>
			{null}
		</Layout>
	)
}

export default IndexPage
