import { useState } from "react";
import { PieceType } from "./elements/Piece";

// Define GameState as an object that maps strings to objects with a "type" property
export type GameState = { [key: string]: { type: PieceType } };

// Set an initial state for the game, using the GameState type
const initialState: GameState = {
	"0,0": { type: PieceType.EMPTY },
};

// Define a hook that returns the game state and methods to modify it
export const useGameState = (initialGameState: GameState = initialState) => {
	// Set up state using the initial game state
	const [game, setGame] = useState(initialGameState);

	// Check if a move is valid based on the piece type and the change in position
	const _checkValidMove = (
		type: PieceType,
		dx: number,
		dy: number
	): boolean => {
		// Determine the absolute value of the change in position
		const adx = Math.abs(dx);
		const ady = Math.abs(dy);
		switch (type) {
			case PieceType.KNIGHT:
				// Knights can move 2 spaces in one direction and 1 in the other, or vice versa
				return (adx === 2 && ady === 1) || (adx === 1 && ady === 2);
			case PieceType.BISHOP:
				// Bishops can move diagonally, so the change in x and y must be the same
				return adx === ady;
			case PieceType.ROOK:
				// Rooks can move horizontally or vertically, but not diagonally
				return adx !== ady && (adx === 0 || ady === 0);
			case PieceType.QUEEN:
				// Queens can move horizontally, vertically, or diagonally
				return (adx !== ady && (adx === 0 || ady === 0)) || adx === ady;
			case PieceType.KING:
				// Kings can move one space in any direction
				return adx in [0, 1] && ady in [0, 1];
			// Pawns can only move one space forward, so the change in x must be 1 and y must be 0
			case PieceType.WHITEPAWN:
				return dx === 1 && dy === 0;
			case PieceType.BLACKPAWN:
				return dx === -1 && dy === 0;
			default:
				return false;
		}
	};

	// Move a piece from one position to another
	const move = (fromX: number, fromY: number, toX: number, toY: number) => {
		const fromKey = `${fromX},${fromY}`;
		const toKey = `${toX},${toY}`;
		const fromPiece = game[fromKey] || { type: PieceType.EMPTY };
		if (_checkValidMove(fromPiece.type, toX - fromX, toY - fromY)) {
			// Create a new object for the game state with the piece moved
			const newGame = { ...game };
			delete newGame[fromKey];
			newGame[toKey] = { type: fromPiece.type };
			setGame(newGame);
		}
	};

	// Check if a move is valid without modifying the game state
	const canMove = (
		fromX: number,
		fromY: number,
		toX: number,
		toY: number
	): boolean => {
		const fromKey = `${fromX},${fromY}`;
		const fromPiece = game[fromKey] || { type: PieceType.EMPTY };
		const dx = toX - fromX;
		const dy = toY - fromY;

		return _checkValidMove(fromPiece.type, dx, dy);
	};

	return { game, move, canMove };
};
