import { useState } from "react";
import Message from "./Message";
import NewMessage from "./NewMessage";

export default function MessageBundle({ index, message }) {
  const [showNewMessage, setShowNewMessage] = useState(false);

  return (
    <div className="row">
      <button className="insert-message" onClick={() => setShowNewMessage(!showNewMessage)}>
        <img id="arrow" src={!showNewMessage ? "plus-arrow.png" : "minus-arrow.png"} />
      </button>
      <div className={"column " + (showNewMessage ? "" : "top-margin")}>
        {showNewMessage && <NewMessage index={index} setShowNewMessage={setShowNewMessage} />}
        <Message index={index} message={message} />
      </div>
    </div>
  );
}
