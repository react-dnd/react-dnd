import type { AngleRange } from '../interfaces.js'

export function distance(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
): number {
	return Math.sqrt(
		Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2),
	)
}

export function inAngleRanges(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	angleRanges: AngleRange[] | undefined,
): boolean {
	if (!angleRanges) {
		return false
	}

	const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 180

	for (let i = 0; i < angleRanges.length; ++i) {
		const ar = angleRanges[i]
		if (
			ar &&
			(ar.start == null || angle >= ar.start) &&
			(ar.end == null || angle <= ar.end)
		) {
			return true
		}
	}

	return false
}
