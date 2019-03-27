import { DragDropManager } from '../../interfaces';
export default function createDrop<Context>(manager: DragDropManager<Context>): (options?: {}) => void;
