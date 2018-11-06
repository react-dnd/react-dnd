import * as React from 'react'
import styled from 'styled-components'

export interface DocProps {
	docPage: {
		htmlAst: any
		html: string
	}
}

const Doc: React.SFC<DocProps> = ({ docPage }) => {
	return (
		<Container>
			<Gutter />
			<HtmlContainer dangerouslySetInnerHTML={{ __html: docPage.html }} />
			<Gutter />
		</Container>
	)
}

const HtmlContainer = styled.div`
	max-width: 100%;
`

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: row;
`

const Gutter = styled.div`
	flex: 1;
`

export default Doc
