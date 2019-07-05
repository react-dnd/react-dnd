import EnterLeaveCounter from '../EnterLeaveCounter'

describe('EnterLeaveCounter', () => {
	const parentDiv = document.createElement('div')
	parentDiv.setAttribute('id', 'parent')
	const childDiv = document.createElement('div')
	childDiv.setAttribute('id', 'child')
	parentDiv.appendChild(childDiv)

	const isNodeInDocument = () => {
		return true
	}
	it('should check if the element is entered', () => {
		const enterLeaveCounter: EnterLeaveCounter = new EnterLeaveCounter(
			isNodeInDocument,
		)
		const hasEntered = enterLeaveCounter.enter(parentDiv)
		expect(hasEntered).toEqual(true)
	})

	it('should not falsely check child elements as new element entered', () => {
		const enterLeaveCounter: EnterLeaveCounter = new EnterLeaveCounter(
			isNodeInDocument,
		)
		enterLeaveCounter.enter(parentDiv)
		const hasEntered = enterLeaveCounter.enter(childDiv)
		expect(hasEntered).toEqual(false)
	})

	it('should check if leave element was entered', () => {
		const enterLeaveCounter: EnterLeaveCounter = new EnterLeaveCounter(
			isNodeInDocument,
		)
		enterLeaveCounter.enter(parentDiv)
		const testElem = document.createElement('p')
		const hasLeft = enterLeaveCounter.leave(testElem)
		expect(hasLeft).toEqual(false)
	})

	it('should leave element if it is entered', () => {
		const enterLeaveCounter: EnterLeaveCounter = new EnterLeaveCounter(
			isNodeInDocument,
		)
		enterLeaveCounter.enter(parentDiv)
		const hasLeft = enterLeaveCounter.leave(parentDiv)
		expect(hasLeft).toEqual(true)
	})
})
