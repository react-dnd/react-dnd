import { tick } from './utils'
import { fireEvent, act } from '@testing-library/react'

export async function fireDragDrop(source: HTMLElement, target: HTMLElement) {
	await act(async () => {
		fireEvent.dragStart(source)
		fireEvent.dragEnter(target)
		fireEvent.dragOver(target)
		fireEvent.drop(target)
		await tick()
	})
}

export async function fireDragHover(source: HTMLElement, target: HTMLElement) {
	await act(async () => {
		fireEvent.dragStart(source)
		fireEvent.dragEnter(target)
		fireEvent.dragOver(target)
		await tick()
	})
}

export async function fireDrag(source: HTMLElement) {
	await act(async () => {
		fireEvent.dragStart(source)
		await tick()
	})
}
