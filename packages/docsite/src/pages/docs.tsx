import { navigate } from 'gatsby'
import { FC, memo } from 'react'

import { Layout } from '../components/layout'

const IndexPage: FC = memo(function IndexPage() {
	if (typeof window !== 'undefined') {
		navigate('/about')
	}
	return <Layout hideSidebar={true}>{null}</Layout>
})

export default IndexPage
