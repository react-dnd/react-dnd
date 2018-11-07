import * as React from 'react'
import Container from './Container'

export interface SortableStressTestState {
	shouldRender: boolean
}

export default class SortableStressTest extends React.Component<
	{},
	SortableStressTestState
> {
	// Avoid rendering on server because the big data list is generated
	public componentDidMount() {
		// Won't fire on server.
		this.setState({ shouldRender: true })
	}

	public render() {
		const { shouldRender } = this.state
		return <div>{shouldRender && <Container />}</div>
	}
}
