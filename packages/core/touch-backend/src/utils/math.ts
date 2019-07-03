import { AngleRange } from '../interfaces'

export function distance(x1: number, y1: number, x2: number, y2: number) {
	return Math.sqrt(
		Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2),
	)
}

export function inAngleRanges(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	angleRanges?: AngleRange[],
) {
	if (!angleRanges) {
		return false
	}

	const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 180

	for (let i = 0; i < angleRanges.length; ++i) {
		if (
			(angleRanges[i].start == null || angle >= angleRanges[i].start) &&
			(angleRanges[i].end == null || angle <= angleRanges[i].end)
		) {
			return true
		}
	}

	return false
}
