import { DropTarget, } from 'react-dnd';
import { Square } from './Square';
import { ItemTypes } from './ItemTypes';
import { Overlay, OverlayType } from './Overlay';
const boardSquareStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
};
const BoardSquare = ({ x, y, connectDropTarget, isOver, canDrop, children, }) => {
    const black = (x + y) % 2 === 1;
    return connectDropTarget(<div role="Space" data-testid={`(${x},${y})`} style={boardSquareStyle}>
			<Square black={black}>{children}</Square>
			{isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover}/>}
			{!isOver && canDrop && <Overlay type={OverlayType.PossibleMove}/>}
			{isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover}/>}
		</div>);
};
export default DropTarget(ItemTypes.KNIGHT, {
    canDrop: ({ game, x, y }) => game.canMoveKnight(x, y),
    drop: ({ game, x, y }) => game.moveKnight(x, y),
}, (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
    };
})(BoardSquare);
