import { useState } from "react";
import { PieceType } from "./elements/Piece";

// Define the game state as a 2D array of PieceType objects
export type GameState = { type: PieceType }[][];

// Custom hook that manages the game state
export const useGameState = (
	// The initial game state (defaults to a single empty square)
	initialGameState: GameState = [[{ type: PieceType.EMPTY }]]
) => {
	// The current game state
	const [game, setGame] = useState(initialGameState);

	// Checks if a move is valid for a given piece type and relative position
	const _checkValidMove = (type: PieceType, dx: number, dy: number) => {
		const adx = Math.abs(dx);
		const ady = Math.abs(dy);

		switch (type) {
			case PieceType.KNIGHT:
				return (adx === 2 && ady === 1) || (adx === 1 && ady === 2);
			case PieceType.BISHOP:
				return adx === ady;
			case PieceType.ROOK:
				return adx !== ady && (adx === 0 || ady === 0);
			case PieceType.QUEEN:
				return (adx !== ady && (adx === 0 || ady === 0)) || adx === ady;
			case PieceType.KING:
				return adx in [0, 1] && ady in [0, 1];
			case PieceType.PAWN:
				return dx === 1 && dy === 0;
			default:
				return false;
		}
	};

	// Moves a piece from one square to another
	const move: (
		fromX: number,
		fromY: number,
		toX: number,
		toY: number
	) => void = (fromX, fromY, toX, toY) => {
		// Check that the move is not a no-op (i.e. the piece is actually moving)
		if (fromX !== toX || fromY !== toY) {
			// Create a copy of the current game state
			const newGame: GameState = game.map((row) => [...row]);

			// Get the piece being moved and ensure it is valid
			const fromPiece = game?.[fromX]?.[fromY] || { type: PieceType.EMPTY };

			// Check that the destination square is within the bounds of the game board
			if (toX >= 0 && toX < game.length && toY >= 0 && toY < game[toX].length) {
				// Update the game state to reflect the move
				newGame[toX][toY] = { type: fromPiece.type };
				newGame[fromX][fromY] = { type: PieceType.EMPTY };
				setGame(newGame);
			}
		}
	};

	// Checks if a piece can move from one square to another
	const canMove: (
		fromX: number,
		fromY: number,
		toX: number,
		toY: number
	) => boolean = (fromX, fromY, toX, toY) => {
		// Calculate the relative position of the move
		const dx = toX - fromX;
		const dy = toY - fromY;

		// Check if the move is valid based on the piece type and relative position
		return _checkValidMove(game[fromX][fromY].type, dx, dy);
	};

	return { game, move, canMove };
};
