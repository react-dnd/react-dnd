import { union, without } from './utils/js_utils'

type NodePredicate = (node: Node | undefined) => boolean

export default class EnterLeaveCounter {
	private entered: any[] = []
	private isNodeInDocument: NodePredicate

	public constructor(isNodeInDocument: NodePredicate) {
		this.isNodeInDocument = isNodeInDocument
	}

	public enter(enteringNode: Node): boolean {
		const previousLength = this.entered.length

		const isNodeEntered = (node: Node): boolean =>
			this.isNodeInDocument(node) &&
			(!node.contains || node.contains(enteringNode))

		this.entered = union(this.entered.filter(isNodeEntered), [enteringNode])

		return previousLength === 0 && this.entered.length > 0
	}

	public leave(leavingNode: Node): boolean {
		const previousLength = this.entered.length

		this.entered = without(
			this.entered.filter(this.isNodeInDocument),
			leavingNode,
		)

		return previousLength > 0 && this.entered.length === 0
	}

	public reset(): void {
		this.entered = []
	}
}
