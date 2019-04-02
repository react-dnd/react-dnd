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
