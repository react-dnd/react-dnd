import { useDrop } from "react-dnd";
import Square from "../elements/Square";
import { Overlay, OverlayType } from "../elements/Overlay";
import { Pieces } from "../constants";

export default function BoardSquare({ x, y, children, move, canMove }) {
  const [{ isOver , canDrop}, drop] = useDrop(
    () => ({
      accept: Object.values(Pieces),
      drop: (item) => {
        const { x: fromX, y: fromY } = item;
        return move(fromX, fromY, x, y);
      },
      canDrop: (item) => {
        const { x: fromX, y: fromY } = item;
        return canMove(fromX, fromY, x, y);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y]
  );

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square isPair={(x + y) % 2 === 1}>{children}</Square>{" "}
      <Overlay
        type={
          (isOver && !canDrop && OverlayType.IllegalMoveHove) ||
          (!isOver && canDrop && OverlayType.PossibleMove) ||
          (isOver && canDrop && OverlayType.LegalMoveHover)
        }
      />
    </div>
  );
};
