import { useContext, useEffect, useRef, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function EditComment({ comment, index }) {
  const { setStory, storyCopy } = useContext(storyCreationContext);
  const [commentCols, setCommentCols] = useState(50);
  const [commentValue, setCommentValue] = useState(comment);
  const [showOptions, setShowOptions] = useState(false);
  const [isSet, setIsSet] = useState(true);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (commentValue.length < 20) {
      setCommentCols(20);
    } else if (commentValue.length >= 20 && commentValue.length < 50) {
      setCommentCols(commentValue.length);
    } else if (commentValue.length > 50) {
      setCommentCols(50);
    }
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [commentValue]);

  const updateMessage = () => {
    const newStory = storyCopy();
    newStory[index][3] = commentValue.trim();
    setStory(newStory);
    setCommentValue(commentValue.trim());
    setIsSet(true);
  };

  const handlePressedKeys = (e) => {
    if (e.key === "Shift") setIsShiftPressed(true);
    if (e.key === "Enter" && !isShiftPressed) e.preventDefault();
  };

  const handleReleasedKeys = (e) => {
    if (e.key === "Shift") setIsShiftPressed(false);
    if (e.key === "Enter" && !isShiftPressed && commentValue.trim() != "") updateMessage();
  };

  function Options() {
    return (
      <div>
        <button type="button" className={"submit option " + (!isSet && commentValue.trim() != "" ? "active" : "disabled")} disabled={isSet || commentValue.trim() == ""} onMouseDown={updateMessage}>
          ✔️
        </button>
        <button
          type="button"
          className={"undo option " + (!isSet ? "active" : "disabled")}
          disabled={isSet}
          onMouseDown={() => {
            //used onMouseDown instead of onClick because it triggers before onBlur.
            setIsSet(true);
            setCommentValue(comment);
          }}
        >
          ↶
        </button>
      </div>
    );
  }

  return (
    <form className="comment row" onBlur={() => setShowOptions(false)}>
      <textarea
        ref={textareaRef}
        cols={commentCols}
        value={commentValue}
        onChange={(e) => {
          setCommentValue(e.target.value);
          if (e.target.value != comment) {
            setIsSet(false);
          } else {
            setIsSet(true);
          }
        }}
        onFocus={() => setShowOptions(true)}
        onKeyDown={handlePressedKeys}
        onKeyUp={handleReleasedKeys}
        className={isSet ? "set" : "unset"}
      />
      {showOptions && <Options />}
    </form>
  );
}
