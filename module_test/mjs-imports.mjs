/* eslint-disable @typescript-eslint/no-var-requires */
import * as core from 'dnd-core'
import * as dnd from 'react-dnd'
import * as htmlBackend from 'react-dnd-html5-backend'
import * as touchBackend from 'react-dnd-touch-backend'
import * as testBackend from 'react-dnd-test-backend'
import * as testUtils from 'react-dnd-test-utils'

if (core.createDragDropManager == null || core.HandlerRole == null) {
	throw new Error('missing exports in core')
}

if (
	dnd.DndContext == null ||
	dnd.DndProvider == null ||
	dnd.DragPreviewImage == null ||
	dnd.useDrag == null ||
	dnd.useDragDropManager == null ||
	dnd.useDragLayer == null ||
	dnd.useDrop == null
) {
	throw new Error('missing exports in dnd')
}

if (
	htmlBackend.HTML5Backend == null ||
	htmlBackend.NativeTypes == null ||
	htmlBackend.getEmptyImage == null
) {
	throw new Error('missing exports in html-abckend')
}

if (
	touchBackend.ListenerType == null ||
	touchBackend.TouchBackend == null ||
	touchBackend.TouchBackendImpl == null
) {
	throw new Error('missing exports in touch-backend')
}

if (testBackend.TestBackend == null || testBackend.TestBackendImpl == null) {
	throw new Error('missing exports in test-backend')
}

if (
	testUtils.fireDrag == null ||
	testUtils.fireDragDrop == null ||
	testUtils.fireDragHover == null ||
	testUtils.getHandlerId == null ||
	testUtils.simulateDrag == null ||
	testUtils.simulateDragDrop == null ||
	testUtils.simulateDragHover == null ||
	testUtils.tick == null ||
	testUtils.wrapWithBackend == null ||
	testUtils.wrapWithTestBackend == null
) {
	throw new Error('missing exports in test-utils')
}

console.log('👍 ESModules OK')
