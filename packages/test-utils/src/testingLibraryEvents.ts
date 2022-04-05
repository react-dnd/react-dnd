import { act, fireEvent } from '@testing-library/react'

import { tick } from './utils.js'

export async function fireDragDrop(source: Element, target: Element) {
	await act(async () => {
		fireEvent.dragStart(source)
		fireEvent.dragEnter(target)
		fireEvent.dragOver(target)
		fireEvent.drop(target)
		await tick()
	})
}

export async function fireDragHover(source: Element, target: Element) {
	await act(async () => {
		fireEvent.dragStart(source)
		fireEvent.dragEnter(target)
		fireEvent.dragOver(target)
		await tick()
	})
}

export async function fireDrag(source: Element) {
	await act(async () => {
		fireEvent.dragStart(source)
		await tick()
	})
}

export async function fireReleaseDrag() {
	await act(async () => {
		fireEvent.drop(window)
		await tick()
	})
}
