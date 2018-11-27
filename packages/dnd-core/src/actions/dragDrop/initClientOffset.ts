import {
	Action,
	InitClientOffsetOptions,
	InitClientOffsetPayload,
} from '../../interfaces'
import { INIT_CLIENT_OFFSET } from './types'

export default function createInitClientOffset() {
	return function initClientOffset({
		clientOffset,
	}: InitClientOffsetOptions): Action<InitClientOffsetPayload> | undefined {
		return {
			type: INIT_CLIENT_OFFSET,
			payload: {
				clientOffset: clientOffset || null,
			},
		}
	}
}
