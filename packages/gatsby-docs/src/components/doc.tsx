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
      <Content dangerouslySetInnerHTML={{ __html: docPage.html }} />
      <Gutter />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding-top: 7em;
`

const Gutter = styled.div`
  flex: 1;
`

const Content = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`

export default Doc
