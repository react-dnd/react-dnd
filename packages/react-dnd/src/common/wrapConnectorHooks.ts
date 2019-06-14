import { isValidElement, ReactElement } from 'react'
import { cloneWithRef } from '../utils/cloneWithRef'

function throwIfCompositeComponentElement(element: React.ReactElement<any>) {
	// Custom components can no longer be wrapped directly in React DnD 2.0
	// so that we don't need to depend on findDOMNode() from react-dom.
	if (typeof element.type === 'string') {
		return
	}

	const displayName =
		(element.type as any).displayName || element.type.name || 'the component'

	throw new Error(
		'Only native element nodes can now be passed to React DnD connectors.' +
			`You can either wrap ${displayName} into a <div>, or turn it into a ` +
			'drag source or a drop target itself.',
	)
}

function wrapHookToRecognizeElement(hook: (node: any, options: any) => void) {
	return (elementOrNode = null, options = null) => {
		// When passed a node, call the hook straight away.
		if (!isValidElement(elementOrNode)) {
			const node = elementOrNode
			hook(node, options)
			// return the node so it can be chained (e.g. when within callback refs
			// <div ref={node => connectDragSource(connectDropTarget(node))}/>
			return node
		}

		// If passed a ReactElement, clone it and attach this function as a ref.
		// This helps us achieve a neat API where user doesn't even know that refs
		// are being used under the hood.
		const element: ReactElement | null = elementOrNode
		throwIfCompositeComponentElement(element as any)

		// When no options are passed, use the hook directly
		const ref = options ? (node: Element) => hook(node, options) : hook
		return cloneWithRef(element, ref)
	}
}

export default function wrapConnectorHooks(hooks: any) {
	const wrappedHooks: any = {}

	Object.keys(hooks).forEach(key => {
		const hook = hooks[key]

		// ref objects should be passed straight through without wrapping
		if (key.endsWith('Ref')) {
			wrappedHooks[key] = hooks[key]
		} else {
			const wrappedHook = wrapHookToRecognizeElement(hook)
			wrappedHooks[key] = () => wrappedHook
		}
	})

	return wrappedHooks
}
