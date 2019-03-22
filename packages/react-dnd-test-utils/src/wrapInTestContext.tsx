import * as React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'

export function wrapInTestContext(DecoratedComponent: any): any {
	return (props: any) => (
		<DragDropContextProvider backend={TestBackend}>
			<DecoratedComponent {...props} />
		</DragDropContextProvider>
	)
}
