import { navigate } from 'gatsby'
import { FC, memo } from 'react'

import { Layout } from '../components/layout'

const IndexPage: FC = memo(function IndexPage(props) {
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
