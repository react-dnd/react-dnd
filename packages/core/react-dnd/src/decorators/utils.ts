export function getDecoratedComponent(instanceRef: React.RefObject<any>) {
	const currentRef = instanceRef.current
	if (currentRef == null) {
		return null
	} else if (currentRef.decoratedRef) {
		// go through the private field in decorateHandler to avoid the invariant hit
		return currentRef.decoratedRef.current
	} else {
		return currentRef
	}
}

export function isClassComponent(Component: any): boolean {
	return (
		Component &&
		Component.prototype &&
		typeof Component.prototype.render === 'function'
	)
}

export function isRefForwardingComponent(C: any) {
	return (
		C && C.$$typeof && C.$$typeof.toString() === 'Symbol(react.forward_ref)'
	)
}

export function isRefable(C: any): boolean {
	return isClassComponent(C) || isRefForwardingComponent(C)
}

export function checkDecoratorArguments(
	functionName: string,
	signature: string,
	...args: any[]
) {
	if (process.env.NODE_ENV !== 'production') {
		for (let i = 0; i < args.length; i++) {
			const arg = args[i]
			if (arg && arg.prototype && arg.prototype.render) {
				// eslint-disable-next-line no-console
				console.error(
					'You seem to be applying the arguments in the wrong order. ' +
						`It should be ${functionName}(${signature})(Component), not the other way around. ` +
						'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#you-seem-to-be-applying-the-arguments-in-the-wrong-order',
				)
				return
			}
		}
	}
}
