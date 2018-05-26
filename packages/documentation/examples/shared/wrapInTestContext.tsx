import React from 'react'
import TestBackend from 'react-dnd-test-backend'
import { DragDropContext } from 'react-dnd'

export default function wrapInTestContext(DecoratedComponent: any): any {
	class TestStub extends React.Component {
		public render() {
			return <DecoratedComponent {...this.props} />
		}
	}

	return DragDropContext(TestBackend)(TestStub)
}
