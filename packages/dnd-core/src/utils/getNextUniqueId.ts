let nextUniqueId = 0

export default function getNextUniqueId(): number {
	return nextUniqueId++
}
