import React, { memo } from 'react'
import styled from 'styled-components'
import { renderHtmlAst } from '../util/renderHtmlAst'

export interface DocProps {
	docPage: {
		htmlAst: any
		html: string
	}
}

export const Doc: React.FC<DocProps> = memo(function Doc({ docPage }) {
	return (
		<Container>
			<Gutter />
			<HtmlContainer>{renderHtmlAst(docPage.htmlAst)}</HtmlContainer>
			<Gutter />
		</Container>
	)
})

const HtmlContainer = styled.div`
	width: 100%;
	max-width: 34rem;
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
