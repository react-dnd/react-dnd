"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HeadNode {
    constructor() {
        this.next = new TailNode(this);
    }
}
exports.HeadNode = HeadNode;
// tslint:disable-next-line:max-classes-per-file
class TailNode {
    constructor(head) {
        this.previous = head;
    }
}
exports.TailNode = TailNode;
// tslint:disable-next-line:max-classes-per-file
class LinkedListNode {
    constructor(item) {
        this.next = null;
        this.previous = null;
        this.item = item;
    }
    detachSelf() {
        if (!this.next && !this.previous) {
            throw new Error('node is not attached');
        }
        if (this.next) {
            this.next.previous = this.previous;
        }
        if (this.previous) {
            this.previous.next = this.next;
        }
        this.next = null;
        this.previous = null;
    }
    attachAfter(node) {
        if (this.next || this.previous) {
            throw new Error('Node is inserted elsewhere');
        }
        this.next = node.next;
        this.previous = node;
        if (node.next) {
            node.next.previous = this;
        }
        node.next = this;
    }
    attachBefore(node) {
        if (!node.previous) {
            throw new Error('no previous node found.');
        }
        this.attachAfter(node.previous);
    }
}
exports.LinkedListNode = LinkedListNode;
// tslint:disable-next-line:max-classes-per-file
class LinkedList {
    constructor() {
        this.head = new HeadNode();
        this.tail = this.head.next;
    }
    add(item) {
        const newNode = new LinkedListNode(item);
        newNode.attachAfter(this.tail.previous);
        return newNode;
    }
    getItems() {
        const result = [];
        this.forEach(item => {
            result.push(item);
        });
        return result;
    }
    forEach(callback) {
        let current = this.head.next;
        while (current !== this.tail) {
            // if item is not tail it is always a node
            const item = current;
            callback(item.item, item);
            if (!item.next) {
                throw new Error('badly attached item found.');
            }
            current = item.next;
        }
    }
    hasItems() {
        return this.head.next !== this.tail;
    }
    getLastItem() {
        if (!this.hasItems()) {
            throw new Error('no items in list.');
        }
        return this.head.next;
    }
}
exports.LinkedList = LinkedList;
//# sourceMappingURL=LinkedList.js.map