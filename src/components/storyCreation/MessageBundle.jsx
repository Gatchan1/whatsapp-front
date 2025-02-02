import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import NewMessage from "./NewMessage";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function MessageBundle({ index, message }) {
  const { chosenPov } = useContext(storyCreationContext);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  const handleMouseMove = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.pageX - window.scrollX - 15 + "px";
      cursorRef.current.style.top = e.pageY - window.scrollY - 40 + "px";
    }
  };

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = () => setIsDragging(false);

  function FollowCursor() {
    return (
      <div className="row align-center drag-message" ref={cursorRef}>
        <button className="grip-static" onMouseDown={handleMouseDown} />
        <Message index={index} message={message} />
      </div>
    );
  }

  return (
    <div className="row">
      <button className="insert-message" onClick={() => setShowNewMessage(!showNewMessage)}>
        <img id="arrow" src={!showNewMessage ? "plus-arrow.png" : "minus-arrow.png"} />
      </button>
      <div className="column">
        {showNewMessage && <NewMessage index={index} setShowNewMessage={setShowNewMessage} />}
        <div className="drop-zone"></div>
        {isDragging && <FollowCursor />}
        <div className={"row align-center message " + (chosenPov == message[3] ? "pov " : "")}>
          <button className="grip" onMouseDown={handleMouseDown} />
          <Message index={index} message={message} />
        </div>
      </div>
    </div>
  );
}

/*
tener en cuenta la última drop-zone, que está en StoryWrite!
*/

/*
<div className={"column " + (showNewMessage ? "" : "top-margin")}>
*/
