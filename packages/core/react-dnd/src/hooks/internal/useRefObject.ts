import { RefObject, useRef, useEffect } from 'react'

export function useRefObject<T>(input: T): RefObject<T> {
	const ref = useRef(input)
	useEffect(() => {
		ref.current = input
	}, [input])
	return ref
}
