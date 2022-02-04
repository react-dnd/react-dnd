import type { XYCoord } from '../../../interfaces'
import type { AnyAction } from 'redux'
import { INIT_COORDS } from '../types'

export function setClientOffset(
	clientOffset: XYCoord | null | undefined,
	sourceClientOffset?: XYCoord | null | undefined,
): AnyAction {
	return {
		type: INIT_COORDS,
		payload: {
			sourceClientOffset: sourceClientOffset || null,
			clientOffset: clientOffset || null,
		},
	}
}
