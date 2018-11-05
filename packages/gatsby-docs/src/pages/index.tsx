import * as React from 'react'
import Layout from '../components/layout'
import { navigate } from 'gatsby'

const IndexPage: React.SFC = () => {
	navigate('/docs/overview')
	return <Layout sidebar={<></>}>{<></>}</Layout>
}

export default IndexPage
