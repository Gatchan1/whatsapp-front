import { useContext, useEffect, useRef, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function NewMessage() {
  const { story, setStory, storyCopy } = useContext(storyCreationContext);
  const [authorSize, setAuthorSize] = useState(8);
  const [authorValue, setAuthorValue] = useState("");
  const [commentCols, setCommentCols] = useState(20);
  const [commentValue, setCommentValue] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (authorValue == "" || commentValue == "") setCanSubmit(false);
    else setCanSubmit(true);
  }, [authorValue, commentValue]);

  useEffect(() => {
    if (authorValue.length > 8) setAuthorSize(authorValue.length);
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
    const newMessage = [false, new Date(story[story.length - 1][1]),authorValue,commentValue];
    const newStory = storyCopy();
    newStory.push(newMessage);
    setStory(newStory);
  };

  return (
    <div>
      <div className="author">
        <p>Add new message:</p>
        <form className="row">
          <input className="new-author" placeholder="somebody" size={authorSize} onChange={(e) => setAuthorValue(e.target.value)} />
          <textarea ref={textareaRef} cols={commentCols} placeholder="bla bla bla" onChange={(e) => setCommentValue(e.target.value)} />
          <button className={"new-message " + (canSubmit ? "enter" : "disabled")} disabled={canSubmit ? "" : "true"} onClick={addMessage}>
            ✔️
          </button>
        </form>
      </div>
    </div>
  );
}
