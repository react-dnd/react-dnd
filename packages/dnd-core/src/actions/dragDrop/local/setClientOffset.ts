import { XYCoord } from '../../../interfaces'
import { INIT_COORDS } from '../types'

export function setClientOffset(
	clientOffset: XYCoord | null | undefined,
	sourceClientOffset?: XYCoord | null | undefined,
) {
	return {
		type: INIT_COORDS,
		payload: {
			sourceClientOffset: sourceClientOffset || null,
			clientOffset: clientOffset || null,
		},
	}
}
