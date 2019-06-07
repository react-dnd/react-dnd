import * as React from 'react'
import styled from 'styled-components'
import renderAst from '../util/renderHtmlAst'

export interface DocProps {
	docPage: {
		htmlAst: any
		html: string
	}
}

const Doc: React.FC<DocProps> = ({ docPage }) => {
	return (
		<Container>
			<Gutter />
			<HtmlContainer>{renderAst(docPage.htmlAst)}</HtmlContainer>
			<Gutter />
		</Container>
	)
}

const HtmlContainer = styled.div`
	width: 75%;
`

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: row;
	max-width: 100%;
`

const Gutter = styled.div`
	flex: 1;
`

export default Doc
