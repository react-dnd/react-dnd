import React from 'react'
import Container from './Container'

export default function DragAroundNaive() {
	const [hideSourceOnDrag, setHideSourceOnDrag] = React.useState(true)
	const toggle = React.useCallback(
		() => setHideSourceOnDrag(!hideSourceOnDrag),
		[hideSourceOnDrag],
	)

	return (
		<div>
			<h1>EXPERIMENTAL API</h1>
			<Container hideSourceOnDrag={hideSourceOnDrag} />
			<p>
				<label htmlFor="hideSourceOnDrag">
					<input
						id="hideSourceOnDrag"
						type="checkbox"
						checked={hideSourceOnDrag}
						onChange={toggle}
					/>
					<small>Hide the source item while dragging</small>
				</label>
			</p>
		</div>
	)
}
