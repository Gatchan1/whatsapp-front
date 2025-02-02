import { useContext, useRef, useState } from "react";
import Message from "./Message";
import NewMessage from "./NewMessage";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function MessageBundle({ index, message }) {
  const { chosenPov } = useContext(storyCreationContext);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [messageHeight, setMessageHeight] = useState(null);
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  const handleMouseDown = () => {
    if (!position && divRef.current) {
      // Calculate the initial position of the element based on its current DOM location
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
    }
    setIsDragging(true);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="row">
      <div className="row">
        <button className="insert-message" onClick={() => setShowNewMessage(!showNewMessage)}>
          <img id="arrow" src={!showNewMessage ? "plus-arrow.png" : "minus-arrow.png"} />
        </button>
        <div className="drop-zone"></div>
      </div>
      <div className={"column " + (showNewMessage ? "" : "top-margin")} style={{ height: `${messageHeight}px` }}>
        {showNewMessage && <NewMessage index={index} setShowNewMessage={setShowNewMessage} />}
        <div
          className={"row align-center draggable-message " + (chosenPov == message[3] ? "pov " : "") + (isDragging ? "above": "")}
          ref={divRef}
          style={{
            left: position ? position.x : "auto",
            top: position ? position.y : "auto",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button className="grip" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
          <Message index={index} message={message} setMessageHeight={setMessageHeight} />
        </div>
      </div>
    </div>
  );
}

/*
tener en cuenta la última drop-zone, que está en StoryWrite!
*/

/*
a ver. creo que tengo que hacer que el div este
<div className={"column " + (showNewMessage ? "" : "top-margin")} style={{ height: `${messageHeight}px` }}>
tenga más altura en caso de que el showNewMessage sea true

!!!!!


also, el dragging no parece funcionar perfecto. en plan que el componente se mueve más rápido (más pixeles) que la mano? hmmm
*/