import * as React from 'react'
import Container from './Container'
export default class DragAroundNaive extends React.Component {
	constructor() {
		super(...arguments)
		this.state = {
			hideSourceOnDrag: true,
		}
		this.handleHideSourceClick = () => {
			this.setState({
				hideSourceOnDrag: !this.state.hideSourceOnDrag,
			})
		}
	}
	render() {
		const { hideSourceOnDrag } = this.state
		return (
			<div>
				<Container hideSourceOnDrag={hideSourceOnDrag} />
				<p>
					<label htmlFor="hideSourceOnDrag">
						<input
							id="hideSourceOnDrag"
							type="checkbox"
							checked={hideSourceOnDrag}
							onChange={this.handleHideSourceClick}
						/>
						<small>Hide the source item while dragging</small>
					</label>
				</p>
			</div>
		)
	}
}
