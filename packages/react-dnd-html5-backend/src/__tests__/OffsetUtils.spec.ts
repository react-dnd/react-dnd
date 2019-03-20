import {
	getNodeClientOffset,
	getEventClientOffset,
	getDragPreviewOffset,
} from '../OffsetUtils'

describe('OffsetUtils', () => {
	describe('getNodeClientOffset', () => {
		it('should get node client offset for element node', () => {
			const el = document.createElement('div')
			expect(getNodeClientOffset(el)).toEqual({
				x: 0,
				y: 0,
			})
		})

		it('should return get parent node client offset if element type is not ELEMENT NODE', () => {
			const el = document.createElement('p')
			el.textContent = 'Text inside paragraph'
			expect(getNodeClientOffset(el.firstChild)).toEqual({
				x: 0,
				y: 0,
			})
		})

		it('should return null if parent node is not of Node.ELEMENT_NODE', () => {
			const el = document.createComment('this is comment node of type 3')
			expect(getNodeClientOffset(el)).toEqual(null)
		})
	})

	describe('getEventClientOffset', () => {
		it('should return client offset', () => {
			const el = document.createEvent('MouseEvent')
			expect(getEventClientOffset(el)).toEqual({
				x: 0,
				y: 0,
			})
		})
	})

	describe('getDragPreviewOffset', () => {
		it('should get offset of drag preview component', () => {
			const sourceNode = document.createElement('div')
			const dragPreview = document.createElement('div')
			const clientOffset = {
				x: 0,
				y: 0,
			}
			const anchorPoint = {
				anchorX: 0,
				anchorY: 0,
			}
			const offsetPoint = {
				offsetX: 0,
				offsetY: 0,
			}
			expect(
				getDragPreviewOffset(
					sourceNode,
					dragPreview,
					clientOffset,
					anchorPoint,
					offsetPoint,
				),
			).toEqual({
				x: 0,
				y: 0,
			})
		})
	})
})
