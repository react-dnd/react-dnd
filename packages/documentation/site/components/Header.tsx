import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import Cover from './Cover'
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
