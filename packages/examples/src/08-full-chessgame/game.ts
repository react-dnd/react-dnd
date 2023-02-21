import { useState } from "react";
import { PieceType } from "./elements/Piece";

export type GameState = { type: PieceType }[][];

export const useGameState = (
	initialGameState: GameState = [[{ type: PieceType.EMPTY }]]
) => {
	const [game, setGame] = useState(initialGameState);

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

	const move: (
		fromX: number,
		fromY: number,
		toX: number,
		toY: number
	) => void = (fromX, fromY, toX, toY) => {
		if (fromX !== toX || fromY !== toY) {
<<<<<<< HEAD
			const newGame: GameState = game.map((row) => [...row]);
			const fromPiece = game?.[fromX]?.[fromY] || { type: PieceType.EMPTY };
			if (toX >= 0 && toX < game.length && toY >= 0 && toY < game[toX].length) {
				newGame[toX][toY] = { type: fromPiece.type };
				newGame[fromX][fromY] = { type: PieceType.EMPTY };
				setGame(newGame);
=======
			const newGame: GameState = game.map((row) => [...row])
			const fromPiece = game?.[fromX]?.[fromY] || { type: PieceType.EMPTY }
			if (toX >= 0 && toX < game.length && toY >= 0 && toY < game?.[toX].length) {
				newGame?[toX]?.[toY] = { type: fromPiece.type }
				newGame[fromX][fromY] = { type: PieceType.EMPTY }
				setGame(newGame)
>>>>>>> 90df997cea392ed2143aff6f5021bb0e3852439a
			}
		}
	};

	const canMove: (
		fromX: number,
		fromY: number,
		toX: number,
		toY: number
	) => boolean = (fromX, fromY, toX, toY) => {
		const dx = toX - fromX;
		const dy = toY - fromY;

		return _checkValidMove(game[fromX][fromY].type, dx, dy);
	};

	return { game, move, canMove };
};
