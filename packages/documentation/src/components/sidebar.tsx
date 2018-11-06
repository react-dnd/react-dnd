import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import { Page, PageGroup } from '../constants'
import theme from '../theme'

export interface SideBarProps {
	groups: PageGroup[]
	location: string
}

const SideBar: React.SFC<SideBarProps> = ({ groups, location }) => {
	function renderGroup({ title, pages }: PageGroup, index: number) {
		return (
			<Group key={index}>
				<GroupTitle>{title}</GroupTitle>
				{Object.keys(pages).map(key => renderLink(pages[key], key))}
			</Group>
		)
	}

	function renderLink({ title, location: pageLocation }: Page, key: string) {
		const isSelected = pageLocation === location.replace('/react-dnd', '')
		const arrow = <span className="arrowBullet" />
		const Link = isSelected ? SelectedSidebarItem : SidebarItem

		return (
			<Link key={key} to={pageLocation}>
				<span>{title}</span>
				{arrow}
			</Link>
		)
	}

	return <Container>{groups.map(renderGroup)}</Container>
}
export default SideBar

const Container = styled.div`
	flex-shrink: 0;
	flex-grow: 1;

	@media only screen and (min-width: ${theme.dimensions.screen.tablet}) {
		position: fixed;
		left: ${theme.dimensions.content.padding};
		top: ${theme.dimensions.navbar.height};
		bottom: 0;
		width: ${theme.dimensions.sidebar.width};
		overflow: scroll;
		padding: 3em 0;
	}
`

const Group = styled.div`
	margin-bottom: ${theme.dimensions.content.padding};
`

const GroupTitle = styled.h4`
	border-bottom: 2px solid fade(${theme.color.accent}, 10%);
	padding-bottom: 0.5em;
	margin: 0 0 0.5em 0;
`

const SidebarItem = styled(GatsbyLink)`
	display: block;
	color: ${theme.color.accent};
`

const SelectedSidebarItem = styled(SidebarItem)`
	font-weight: bold;
	position: relative;

	&:after {
		content: '·';
		position: absolute;
		left: -0.5em;
		top: 0;
		bottom: 0;
	}
`
