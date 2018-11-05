import * as React from 'react'
import styled from 'styled-components'
import NavBar from './navbar'

const Header = ({ siteTitle }) => (
  <Container>
    <NavBar />
  </Container>
)

export default Header

const Container = styled.header`
  overflow: hidden;
`
