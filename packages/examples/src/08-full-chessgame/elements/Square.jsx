export default function Square({ isPair, children }) {
  const fill = isPair ? "black" : "white";
  const stroke = isPair ? "white" : "black";

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
