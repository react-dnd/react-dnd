/* eslint-disable @typescript-eslint/no-var-requires */
const core = require('dnd-core')
const dnd = require('react-dnd')
const htmlBackend = require('react-dnd-html5-backend')
const touchBackend = require('react-dnd-touch-backend')
const testBackend = require('react-dnd-test-backend')
const testUtils = require('react-dnd-test-utils')

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

console.log('👍 CommonJS Modules OK')
