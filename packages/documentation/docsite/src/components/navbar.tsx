import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import theme from '../theme'

const NavBar: React.FC = () => (
	<Container>
		<ContentContainer>
			<LogoContainer>
				<LogoTitle to="/">
					React <i>DnD</i>
				</LogoTitle>
				<LogoDescription>Drag and Drop for React</LogoDescription>
			</LogoContainer>
			<div>
				<StyledGatsbyLink to={'/docs/overview'}>Docs</StyledGatsbyLink>
				<StyledGatsbyLink to={'/examples'}>Examples</StyledGatsbyLink>
				<StyledWebLink href={'https://github.com/react-dnd/react-dnd/'}>
					GitHub
				</StyledWebLink>
			</div>
		</ContentContainer>
	</Container>
)
export default NavBar

const Container = styled.div`
	z-index: 3;
	top: 0;
	position: fixed;
	width: 100%;
	padding: 0 ${theme.dimensions.content.padding};
	background-color: rgb(255, 255, 255, 0.9);
`

const ContentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	height: ${theme.dimensions.navbar.height};
	padding: 0.75em 0;
	border-bottom: 2px solid rgb(${theme.color.accentRGB.join(',')}, 0.1);
`

const StyledWebLink = styled.a`
	color: ${theme.color.accent};
	margin-left: 1em;
`

const StyledGatsbyLink = styled(GatsbyLink)`
	color: ${theme.color.accent};
	margin-left: 1em;
`

const LogoTitle = styled(GatsbyLink)`
	font-weight: bold;
	font-size: 1.125em;
`

const LogoDescription = styled.p`
	margin: 0;
	font-size: 0.875em;
`

const LogoContainer = styled.div`
	color: ${theme.color.accent};
	line-height: 1.4;
`
