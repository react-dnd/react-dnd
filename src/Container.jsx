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
  const [dropBox, setDropBox] = useState([
    { accepts: "", lastDroppedItem: null }
  ]);
  const [input, setInput] = useState('');
  const [boxes, setBoxes] = useState([
    { name: "apple", type: "str", id: 1 },
    { name: "Banana", type: "str", id: 2 },
    { name: "orange", type: "str", id:3 },
  ]);

  const [cards, setCards] = useState(boxes);
    // const findCard = useCallback((id) => {
    //     const card = cards.filter((c) => `${c.id}` === id)[0];
    //     return {
    //         card,
    //         index: cards.indexOf(card),
    //     };
    // }, [cards]);
    // const moveCard = useCallback((id, atIndex) => {
    //     const { card, index } = findCard(id);
    //     setCards(update(cards, {
    //         $splice: [
    //             [index, 1],
    //             [atIndex, 0, card],
    //         ],
    //     }));
    //     setBoxes(cards)
    // }, [findCard, cards, setCards]);

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
      setDropBox(
        update(dropBox, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      );
    },
    [droppedBoxNames, dropBox]
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
            {boxes.map(({ name, type, id }, index) => (
              <Box
                name={name}
                type={type}
                isDropped={isDropped(name)}
                // moveCard={moveCard} // it will use for reverse drag / rearrange
                // findCard={findCard}
                // key={id} 
                // id={`${id}`}
              />
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          {dropBox.map(({ accepts, lastDroppedItem }, index) => (
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
