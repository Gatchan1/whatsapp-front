import { useContext, useEffect, useRef, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function EditComment({ comment, index }) {
  const { setStory, storyCopy } = useContext(storyCreationContext);
  const [commentCols, setCommentCols] = useState(20);
  const [commentValue, setCommentValue] = useState(comment);
  const [showOptions, setShowOptions] = useState(false);
  const [isSet, setIsSet] = useState(true);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (commentValue.length == 0) {
      setCommentCols(20);
    } else if (commentValue.length < 50) {
      setCommentCols(commentValue.length);
    }
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [commentValue]);

  const updateMessage = () => {
    const newStory = storyCopy();
    newStory[index][3] = commentValue;
    setStory(newStory);
    setIsSet(true);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateMessage();
    }
  };

  function Options() {
    return (
      <div>
        <button type="button" className={"enter option " + (!isSet ? "active" : "disabled")} disabled={isSet ? "true" : ""} onMouseDown={updateMessage}>
          ✔️
        </button>
        <button
          type="button"
          className={"undo option " + (!isSet ? "active" : "disabled")}
          disabled={isSet ? "true" : ""}
          //(writing "false" returns true for being a non-empty string)
          onMouseDown={() => {
            //used onMouseDown instead of onClick because it triggers before onBlur.
            setIsSet(true);
            setCommentValue(comment);
            setShowOptions(false);
          }}
        >
          ↶
        </button>
      </div>
    );
  }

  return (
    <form className="comment row"
    onBlur={() => setShowOptions(false)}>
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
        onKeyDown={handleEnter}
        className={isSet ? "set" : "unset"}
      />
      {showOptions && <Options />}
    </form>
  );
}
