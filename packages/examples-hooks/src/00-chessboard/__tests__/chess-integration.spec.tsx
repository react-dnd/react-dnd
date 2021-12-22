import { render, screen, RenderResult, cleanup } from '@testing-library/react'
import { Game } from '../Game'
import { Board } from '../Board'
import { OverlayType } from '../Overlay'
import {
	wrapWithBackend,
	fireDragHover,
	fireDragDrop,
} from 'react-dnd-test-utils'

const TestBoard = wrapWithBackend(Board)
function renderGame(game: Game): RenderResult {
	return render(<TestBoard game={game} />)
}

describe('The Chess Example', () => {
	let game: Game
	beforeEach(() => {
		/*
		 * Every time Knight initial position: "57"
		 * and Knight droppable positions are "40", "42", "51"
		 * when you got all cells with screen.getAllByRole('gridcell')
		 */
		game = new Game()
		renderGame(game)
	})

	afterEach(cleanup)

	describe('initial state', () => {
		it('renders the Knight appropriately', () => {
			const Knight = screen.getByText('♘')

			const display = window
				.getComputedStyle(Knight)
				.getPropertyValue('display')
			const opacity = window
				.getComputedStyle(Knight)
				.getPropertyValue('opacity')
			const fontSize = window
				.getComputedStyle(Knight)
				.getPropertyValue('font-size')
			const fontWeight = window
				.getComputedStyle(Knight)
				.getPropertyValue('font-weight')
			const cursor = window.getComputedStyle(Knight).getPropertyValue('cursor')

			expect({
				display: display,
				opacity: opacity,
				fontSize: fontSize,
				fontWeight: fontWeight,
				cursor: cursor,
			}).toStrictEqual({
				display: 'block',
				opacity: '1',
				fontSize: '40px',
				fontWeight: 'bold',
				cursor: 'move',
			})
		})

		it('has a board with an 8x8 grid of spaces', () => {
			const boardSquares = screen.getAllByRole('Space')
			expect(boardSquares.length).toBe(8 * 8)
		})

		it("sets the Knight's initial position to (1,7)", () => {
			expect(screen.getByTestId('(1,7)')).toHaveTextContent('♘')
		})
	})

	describe('Knight movement', () => {
		// Knight initially has moving position 'index: 40 42 51' of 64 cell array
		it('can move to (0,5)', async () => {
			const knight = screen.getByText('♘')
			const targetSpace = screen.getByTestId('(0,5)')
			await fireDragDrop(knight, targetSpace)
			expect(targetSpace).toHaveTextContent('♘')
		})

		it('can move to space (2,5))', async () => {
			const knight = screen.getByText('♘')
			const targetSpace = screen.getByTestId('(2,5)')
			await fireDragDrop(knight, targetSpace)
			expect(targetSpace).toHaveTextContent('♘')
		})

		it('can move to space (3,6))', async () => {
			const knight = screen.getByText('♘')
			const targetSpace = screen.getByTestId('(3,6)')
			await fireDragDrop(knight, targetSpace)
			expect(targetSpace).toHaveTextContent('♘')
		})

		it('cannot move to an illegal space', async () => {
			const knight = screen.getByText('♘')
			const illegalSpace = screen.getByTestId('(0,7)')
			await fireDragDrop(knight, illegalSpace)
			expect(illegalSpace).not.toHaveTextContent('♘')
		})

		// TODO: this test must be last, or else other tests in this describe block fail. I'm unsure why,
		// this should be investigated
		it('highlights legal positions when the knight is drag-held', async () => {
			const knight = screen.getByText('♘')

			await fireDragHover(knight, screen.getByTestId('(1,7)'))

			// Yellow cell is knight moving range
			const legalMoves = screen.getAllByRole(OverlayType.PossibleMove)
			expect(legalMoves.length).toBe(3)
			legalMoves.forEach((square) => {
				expect(square).toHaveStyle('backgroundColor: yellow')
			})

			// Red cell is current knight position when hold dragging
			expect(screen.getByRole(OverlayType.IllegalMoveHover)).toHaveStyle(
				'backgroundColor: red',
			)
		})
	})
})
