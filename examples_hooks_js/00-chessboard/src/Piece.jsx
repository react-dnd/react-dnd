import { Knight } from './Knight';
export const Piece = ({ isKnight }) => isKnight ? <Knight /> : null;
