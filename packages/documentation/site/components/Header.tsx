import * as React from 'react'
import NavBar from './NavBar'
import './Header.less'

export default class Header extends React.Component {
	public render() {
		return (
			<header className="Header">
				<NavBar />
			</header>
		)
	}
}
