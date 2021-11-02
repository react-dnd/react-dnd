import { useState, useCallback, memo } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
import { ItemTypes } from "./ItemTypes";
import update from "immutability-helper";

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
export const Container = memo(function Container() {
  const [dustbins, setDustbins] = useState([
    { accepts: "", lastDroppedItem: null }
  ]);
  const [input, setInput] = useState('');
  const [boxes, setBoxes] = useState([
    { name: "apple", type: "str" },
    { name: "Banana", type: "str" },
    { name: "orange", type: "str" }
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      const updatedBox = boxes.filter((box) => box.name !== name);
      setBoxes(updatedBox);
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

  return (
    <>
      <input 
      type="text"
       value={input}
       style={{ padding: '2px', margin: '2px'}} 
       onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => {
        boxes.push({name: input, type: 'str' });
        setBoxes([...boxes]);
        setInput('');
        }}
       style={{ padding: '2px', margin: '2px'}}
       >Add</button>
      <div style={{ display: "flex" }}>
        <div style={{ ...style, maxheight: '400xp', overflow: 'auto' }}>
          <div style={{ overflow: "hidden", clear: "both" }}>
            {boxes.map(({ name, type }, index) => (
              <Box
                name={name}
                type={type}
                isDropped={isDropped(name)}
                key={index}
              />
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) => (
            <Dustbin
              accept={accepts}
              lastDroppedItem={lastDroppedItem}
              onDrop={(item) => handleDrop(index, item)}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
});
