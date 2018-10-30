import * as React from 'react'
import styled from 'styled-components'
import theme from '../theme'

export interface PageBodyProps {
	hasSidebar: boolean
	html?: any
}
export default class PageBody extends React.Component<PageBodyProps> {
	public render() {
		const { hasSidebar, children } = this.props
		const Content = hasSidebar ? SidebarContent : PlainContent
		return (
			<Container>
				<Content>{children}</Content>
			</Container>
		)
	}
}

const Container = styled.div`
	padding: 6em 1.5em;
	background-color: #fff;
`

const PlainContent = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: ${theme.dimensions.content.width};

	@media only screen and (min-width: ${theme.dimensions.screen.tablet}) {
		flex-direction: row;
	}
`

const SidebarContent = styled.div`
	@media only screen and (min-width: ${theme.dimensions.screen.tablet}) {
		margin-left: 15em;
	}
`
