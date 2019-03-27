import * as React from 'react'
import renderAst from '../util/renderHtmlAst'
const styled = require('styled-components')

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
	max-width: 100%;
	width: 100%;
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
