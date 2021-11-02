import { memo, useState } from "react";
import { useDrop } from "react-dnd";
import { uniq, uniqBy } from "lodash";
const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "black",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  border: "1px solid red"
};
const boxStyle = {
  backgroundColor: "#ccc",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  width: "150px",
  float: "left"
};
export const Dustbin = memo(function Dustbin({
  accept,
  lastDroppedItem = null,
  onDrop
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "str",
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const [dropItems] = useState([]);
  if (!dropItems.length && lastDroppedItem) {
    dropItems.push(lastDroppedItem);
    uniq(dropItems);
  } else if (dropItems.length) {
    dropItems.push(lastDroppedItem);
  }

  const dropValue = uniqBy(dropItems, "name");
  let [finalJson, setFinalJson] = useState('');
  return (
    <>
    <div
      ref={drop}
      role="Dustbin"
      style={{ ...style, maxheight: "400xp", width: 'auto', minWidth: '300px', overflow: "auto" }}
    >
      {dropValue.length
        ? dropValue.map((obj, index) => (
            <div style={{ display: 'flex'}}>
              <div style={{ ...boxStyle }}>{obj.name}</div>
              <input style={{ height: '28px', margin: '0 2px', padding: '2px' }} type="text" name='keyMessage' placeHolder="Key Message" onChange={(e) => {obj.keyMessage = [e.target.value]}} />
              <input style={{ height: '28px', margin: '0 2px', padding: '2px' }} type="text"  name='tagTranslator' placeHolder="Tag Translation" onChange={(e) => {obj.tagTranslator = [e.target.value]}} />
            </div>
          ))
        : ""}
    </div>
  <button onClick={() => {setFinalJson(JSON.stringify(dropValue))}}>Final Output Json</button>
  {finalJson ? <p>{finalJson}</p> : ''}
  </>
  );
});
