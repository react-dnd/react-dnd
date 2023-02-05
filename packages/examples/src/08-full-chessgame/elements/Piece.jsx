import { useDrag } from "react-dnd";
import pieces from "../assets/pieces.svg";

export default function Piece({ type, x, y, style }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { x, y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <svg
        viewBox="0 0 45 45"
        style={{
          ...style,
          zIndex: 5,
          position: "relative",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <use href={`${pieces}#piece-white-${type}`} />
      </svg>
    </div>
  );
}
