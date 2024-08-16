import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import EditAuthorMessage from "./authorEditing/EditAuthorMessage";
import EditComment from "./EditComment";
import EditTime from "./EditTime";
import AlertDeleteMessage from "./AlertDeleteMessage";

export default function Message({ message, index }) {
  const { story, setStory, storyCopy } = useContext(storyCreationContext);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(()=>{
    const handleKeyDown = (event) => {
      if (event.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };
    const handleKeyUp = (event) => {
      if (event.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  },[])

  const deleteHandler = () => {
    if (isShiftPressed) {
      deleteMessage();
    } else {
      setShowDeleteAlert(true);
    }
  }

  const deleteMessage = () => {
    const newStory = storyCopy();
    newStory.splice(index, 1);
    setStory(newStory);
    setShowDeleteAlert(false);
  }

  return (
    <div className="row">
      <div>
        <EditTime checkbox={message[0]} time={message[2]} index={index} />
        <div className="row left-margin">
          <EditAuthorMessage author={message[3]} index={index} />
          <EditComment comment={message[4]} index={index} />
        </div>
      </div>
      <button className="delete" onClick={deleteHandler}>x</button>
      {showDeleteAlert && <AlertDeleteMessage setShowDeleteAlert={setShowDeleteAlert} deleteMessage={deleteMessage} />}
    </div>
  );
}
