import union from 'lodash/array/union';
import without from 'lodash/array/without';

export default class EnterLeaveCounter {
  constructor() {
    this.entered = [];
  }

  enter(enteringNode) {
    this.entered = union(
      this.entered.filter(node =>
        document.body.contains(node) &&
        (!node.contains || node.contains(enteringNode))
      ),
      [enteringNode]
    );

    return this.entered.length === 1;
  }

  leave(leavingNode) {
    this.entered = without(
      this.entered.filter(node =>
        document.body.contains(node)
      ),
      leavingNode
    );

    return this.entered.length === 0;
  }

  reset() {
    this.entered = [];
  }
}
