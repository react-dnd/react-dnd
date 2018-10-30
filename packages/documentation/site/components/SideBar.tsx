import * as React from 'react'
import styled from 'styled-components'
import { Page, PageGroup } from '../Constants'
import theme from '../theme'

export interface SideBarProps {
	groups: PageGroup[]
	example: Page
}

export default class SideBar extends React.Component<SideBarProps> {
	public render() {
		return (
			<Container>
				<div>{this.props.groups.map(this.renderGroup, this)}</div>
			</Container>
		)
	}

	private renderGroup({ title, pages }: PageGroup, index: number) {
		return (
			<Group key={index}>
				<GroupTitle>{title}</GroupTitle>
				{Object.keys(pages).map(key => this.renderLink(pages[key], key))}
			</Group>
		)
	}

	private renderLink({ title, location }: Page, key: string) {
		const isSelected = this.props.example.location === location
		const arrow = <span className="arrowBullet" />
		const Link = isSelected ? SelectedSidebarItem : SidebarItem

		return (
			<Link key={key} href={location} target="_self">
				<span>{title}</span>
				{arrow}
			</Link>
		)
	}
}

const Container = styled.div`
	flex-shrink: 0;

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

const SidebarItem = styled.a`
	display: block;
	color: ${theme.color.body};
`

const SelectedSidebarItem = styled(SidebarItem)`
	color: ${theme.color.accent};
	position: relative;

	&:after {
		content: '·';
		position: absolute;
		left: -0.5em;
		top: 0;
		bottom: 0;
	}
`
