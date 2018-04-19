export type State = number

export default function stateId(state: State = 0) {
	return state + 1
}
