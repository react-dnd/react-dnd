import * as React from 'react'
import Layout from '../components/layout'
import { navigate } from 'gatsby'

const IndexPage: React.FC = () => {
	if (typeof window !== 'undefined') {
		navigate('/about')
	}
	return <Layout hideSidebar={true}>{null}</Layout>
}

export default IndexPage
