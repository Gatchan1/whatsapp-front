import { useContext, useEffect, useRef, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import SelectAuthors from "./authorEditing/SelectAuthors";

export default function NewMessage({ index, setShowNewMessage }) {
  const { story, setStory, storyCopy } = useContext(storyCreationContext);
  const [authorSize, setAuthorSize] = useState(8);
  const [authorValue, setAuthorValue] = useState("");
  const [commentCols, setCommentCols] = useState(20);
  const [commentValue, setCommentValue] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (authorValue == "" || commentValue == "") setCanSubmit(false);
    else setCanSubmit(true);
  }, [authorValue, commentValue]);

  useEffect(() => {
    if (authorValue.length > 7 && authorValue.length < 30) setAuthorSize(authorValue.length);
  }, [authorValue]);

  useEffect(() => {
    if (commentValue.length < 20) {
      setCommentCols(20);
      textareaRef.current.style.height = "auto";
    } else if (commentValue.length >= 20 && commentValue.length < 50) {
      setCommentCols(commentValue.length);
    } else if (commentValue.length > 50) {
      setCommentCols(50);
    }
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [commentValue]);

  const addMessage = (e) => {
    e.preventDefault();
    let insertIndex, dateIndex;
    if (index || index === 0) {
      // If we get an index through props, then the message will be inserted
      // right there in the story; otherwise it'll get attached at the end.
      insertIndex = index;
      dateIndex = index;
    } else {
      insertIndex = story.length;
      dateIndex = story.length - 1;
    }
    const newMessage = [false, new Date(story[dateIndex][1]), authorValue, commentValue];
    const newStory = storyCopy();
    newStory.splice(insertIndex, 0, newMessage);
    setStory(newStory);
    if (setShowNewMessage) setShowNewMessage(false);
    setAuthorValue("");
    setCommentValue("");
  };

  const selectOne = (chosenAuthor) => {
    setAuthorValue(chosenAuthor);
    setShowSelect(false);
  };

  return (
    <div>
      <div className="new-message">
        <form className="row">
          <div className="relative author">
            {showSelect && <SelectAuthors selectOne={selectOne} />}
            <input
              ref={inputRef}
              onClick={() => setShowSelect(true)}
              onBlur={() => setShowSelect(false)}
              className="new-author"
              placeholder="somebody"
              size={authorSize}
              onChange={(e) => {
                setAuthorValue(e.target.value);
                setShowSelect(false);
              }}
              value={authorValue}
            />
          </div>
          <textarea
            ref={textareaRef}
            cols={commentCols}
            placeholder="bla bla bla"
            onChange={(e) => setCommentValue(e.target.value)}
            value={commentValue}
          />
          <button className={"add-message submit " + (canSubmit ? "active" : "disabled")} disabled={!canSubmit} onClick={addMessage}>
            ✔️
          </button>
        </form>
      </div>
    </div>
  );
}
