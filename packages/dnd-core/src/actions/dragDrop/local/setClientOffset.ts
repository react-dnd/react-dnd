import { XYCoord } from '../../../interfaces'
import { INIT_COORDS } from '../types'
import { AnyAction } from 'redux'

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
