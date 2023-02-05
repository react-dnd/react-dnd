import { useState } from "react";
import { Pieces } from "./constants";

export default function useGameState(initialGameState) {
  const [game, setGame] = useState(initialGameState);

  const _checkValidMove = (type, dx, dy) => {
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    switch (type) {
      case Pieces.KNIGHT:
        return (adx === 2 && ady === 1) || (adx === 1 && ady === 2);
      case Pieces.BISHOP:
        return adx === ady;
      case Pieces.ROOK:
        return adx !== ady && (adx === 0 || ady === 0);
      case Pieces.QUEEN:
        return (adx !== ady && (adx === 0 || ady === 0)) || adx === ady;
      case Pieces.KING:
        return adx in [0, 1] && ady in [0, 1];
      case Pieces.PAWN:
        return dx === 1 && dy === 0;
      default:
        return false;
    }
  };
  
  const move = (fromX, fromY, toX, toY) => {
    if(fromX !== toX || fromY !== toY) {
      const newGame = [...game];
      newGame[toX][toY] = { type: game[fromX][fromY].type };
      newGame[fromX][fromY] = { type: null };
      setGame(newGame);
    }
  };

  const canMove = (fromX, fromY, toX, toY) => {
    const dx = toX - fromX;
    const dy = toY - fromY;

    return _checkValidMove(game[fromX][fromY].type, dx, dy);
  };

  return [game, move, canMove];
}
