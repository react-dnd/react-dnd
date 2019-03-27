import { cloneElement } from 'react';
const invariant = require('invariant');
function setRef(ref, node) {
    if (typeof ref === 'function') {
        ref(node);
    }
    else {
        ref.current = node;
    }
}
export default function cloneWithRef(element, newRef) {
    const previousRef = element.ref;
    invariant(typeof previousRef !== 'string', 'Cannot connect React DnD to an element with an existing string ref. ' +
        'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' +
        'Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
    if (!previousRef) {
        // When there is no ref on the element, use the new ref directly
        return cloneElement(element, {
            ref: newRef,
        });
    }
    return cloneElement(element, {
        ref: (node) => {
            setRef(newRef, node);
            if (previousRef) {
                setRef(previousRef, node);
            }
        },
    });
}
