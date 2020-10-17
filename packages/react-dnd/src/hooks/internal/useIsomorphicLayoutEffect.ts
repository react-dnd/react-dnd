import { useLayoutEffect, useEffect } from 'react'

// suppress the useLayoutEffect warning on server side.
export const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect
