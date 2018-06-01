import React from 'react'
import PropTypes from 'prop-types'
import './PageBody.less'

export interface PageBodyProps {
	hasSidebar: boolean
	html?: any
}
export default class PageBody extends React.Component<PageBodyProps> {
	public static propTypes = {
		hasSidebar: PropTypes.bool,
	}

	public render() {
		const { hasSidebar, html, ...props } = this.props
		return (
			<div className={`PageBody ${hasSidebar ? 'PageBody--hasSidebar' : ''}`}>
				<div className="PageBody-container">{this.props.children}</div>
			</div>
		)
	}
}
