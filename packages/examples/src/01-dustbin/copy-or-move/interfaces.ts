export interface DragItem {
	type: string
	name: string
}

export interface DropResult {
	name: string
	dropEffect: string
	allowedDropEffect: string
}
