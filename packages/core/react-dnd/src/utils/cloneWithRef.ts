import { cloneElement } from 'react'
import { invariant } from '@react-dnd/invariant'

function setRef(ref: any, node: any) {
	if (typeof ref === 'function') {
		ref(node)
	} else {
		ref.current = node
	}
}

export function cloneWithRef(
	element: any,
	newRef: any,
): React.ReactElement<any> {
	const previousRef = element.ref
	invariant(
		typeof previousRef !== 'string',
		'Cannot connect React DnD to an element with an existing string ref. ' +
			'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' +
			'Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute',
	)

	if (!previousRef) {
		// When there is no ref on the element, use the new ref directly
		return cloneElement(element, {
			ref: newRef,
		})
	} else {
		return cloneElement(element, {
			ref: (node: any) => {
				setRef(previousRef, node)
				setRef(newRef, node)
			},
		})
	}
}
