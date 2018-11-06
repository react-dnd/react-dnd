import * as React from 'react'
import Layout from '../components/layout'
import { navigate } from 'gatsby'

const IndexPage: React.SFC = () => {
	navigate('/about')
	return <Layout>{<></>}</Layout>
}

export default IndexPage
