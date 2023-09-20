import { Link as GatsbyLink } from 'gatsby'
import { FC, memo } from 'react'
import styled from 'styled-components'

import { Page, PageGroup } from '../constants'
import { theme } from '../theme'
import { isDebugMode } from '../util/isDebugMode'

export interface SideBarProps {
	groups: PageGroup[]
	location: string
}

export const Sidebar: FC<SideBarProps> = memo(function Sidebar({
	groups,
	location,
}) {
	const navigationName = location.split('/')[1]
	function renderGroup({ title, pages, debug }: PageGroup, index: number) {
		const id = `${title}-${index}`
		const isRendered = !debug || isDebugMode()
		return isRendered ? (
			<Group key={index}>
				<div role="presentation" aria-hidden="true">
					<GroupTitle id={id}>{title}</GroupTitle>
				</div>
				<List aria-labelledby={id}>
					{Object.keys(pages).map((key) => renderLink(pages[key], key))}
				</List>
			</Group>
		) : null
	}

	function renderLink({ title, location: pageLocation }: Page, key: string) {
		const isSelected = pageLocation === location.replace('/react-dnd', '')
		const arrow = <span className="arrowBullet" />
		const Link = isSelected ? SelectedSidebarItem : SidebarItem

		return (
			<ListItem key={key}>
				<Link to={pageLocation}>
					<span>{title}</span>
					{arrow}
				</Link>
			</ListItem>
		)
	}

	return (
		<Container aria-label={`${navigationName}`}>
			<List>{groups.map(renderGroup)}</List>
		</Container>
	)
})

const Container = styled.nav`
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

const List = styled.ul`
	list-style: none;
	margin-block-start: 0;
	margin-block-end: 0;
	padding: 0;
	margin: 0;
`

const ListItem = styled.li`
	list-style: none;
	margin: 0;
	margin-block-start: 0;
  margin-block-end: 0;
`

const Group = styled.li`
	list-style: none;
	margin: 0;
	margin-block-start: 0;
	margin-block-end: 0;
	margin-bottom: 1.5em;
`

const GroupTitle = styled.span`
	border-bottom: 2px solid fade(${theme.color.accent}, 10%);
	padding-bottom: 1em;
	display: block;
	font-weight: bold;
	font-size: 1rem;
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
