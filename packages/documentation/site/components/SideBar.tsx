import * as React from 'react'
import './SideBar.less'
import { Page, PageGroup } from '../Constants'

export interface SideBarProps {
	groups: PageGroup[]
	example: Page
}

export default class SideBar extends React.Component<SideBarProps> {
	public render() {
		return (
			<div className="SideBar">
				<div className="SideBar-content">
					{this.props.groups.map(this.renderGroup, this)}
				</div>
			</div>
		)
	}

	private renderGroup({ title, pages }: PageGroup, index: number) {
		return (
			<div className="SideBar-group" key={index}>
				<h4 className="SideBar-groupTitle">{title}</h4>
				{Object.keys(pages).map(key => this.renderLink(pages[key], key))}
			</div>
		)
	}

	private renderLink({ title, location }: Page, key: string) {
		const arrow = <span className="arrowBullet" />

		let linkClass = 'SideBar-item'
		if (this.props.example.location === location) {
			linkClass += ' SideBar-item--selected'
		}

		return (
			<a key={key} href={location} target="_self" className={linkClass}>
				<span className="SideBar-itemText">{title}</span>
				{arrow}
			</a>
		)
	}
}
