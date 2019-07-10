import { union, without } from './utils/js_utils'
type NodePredicate = (node: any) => boolean

export default class EnterLeaveCounter {
	private entered: any[] = []
	private isNodeInDocument: NodePredicate

	public constructor(isNodeInDocument: NodePredicate) {
		this.isNodeInDocument = isNodeInDocument
	}

	public enter(enteringNode: any) {
		const previousLength = this.entered.length

		const isNodeEntered = (node: any) =>
			this.isNodeInDocument(node) &&
			(!node.contains || node.contains(enteringNode))

		this.entered = union(this.entered.filter(isNodeEntered), [enteringNode])

		return previousLength === 0 && this.entered.length > 0
	}

	public leave(leavingNode: any) {
		const previousLength = this.entered.length

		this.entered = without(
			this.entered.filter(this.isNodeInDocument),
			leavingNode,
		)

		return previousLength > 0 && this.entered.length === 0
	}

	public reset() {
		this.entered = []
	}
}
