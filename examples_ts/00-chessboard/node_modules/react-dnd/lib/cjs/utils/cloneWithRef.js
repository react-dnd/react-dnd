"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var invariant = require('invariant');
function setRef(ref, node) {
    if (typeof ref === 'function') {
        ref(node);
    }
    else {
        ref.current = node;
    }
}
function cloneWithRef(element, newRef) {
    var previousRef = element.ref;
    invariant(typeof previousRef !== 'string', 'Cannot connect React DnD to an element with an existing string ref. ' +
        'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' +
        'Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
    if (!previousRef) {
        // When there is no ref on the element, use the new ref directly
        return react_1.cloneElement(element, {
            ref: newRef,
        });
    }
    return react_1.cloneElement(element, {
        ref: function (node) {
            setRef(newRef, node);
            if (previousRef) {
                setRef(previousRef, node);
            }
        },
    });
}
exports.default = cloneWithRef;
