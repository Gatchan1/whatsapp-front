import { useContext, useEffect, useRef, useState } from "react";
import { storyCreationContext } from "../../../contexts/storyCreation.context";

export default function EditAuthorGlobal({ author }) {
  const { story, setStory, storyCopy, retrieveUniqueAuthors } = useContext(storyCreationContext);
  const [value, setValue] = useState(author);
  const [showOptions, setShowOptions] = useState(false);
  const [isSet, setIsSet] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(author);
  }, [story, author]);

  const updateAll = () => {
    const newStory = storyCopy();
    for (let i = 0; i < newStory.length; i++) {
      if (newStory[i][3] == author) {
        newStory[i][3] = value;
      }
    }
    setStory(newStory);
    retrieveUniqueAuthors(newStory);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && value !== "") {
      updateAll();
      setIsSet(true);
      inputRef.current.blur();
    }
  };

  return (
    <form className="author-global relative" onSubmit={(e) => e.preventDefault()} onBlur={() => setShowOptions(false)}>
      <input
        ref={inputRef}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value != author) {
            setIsSet(false);
          } else {
            setIsSet(true);
          }
        }}
        placeholder="This can't go empty"
        onFocus={() => setShowOptions(true)}
        onKeyDown={handleEnter}
        size={value.length}
        value={value}
        className={isSet ? "set" : "unset"}
      />
      {showOptions && (
        <button
          type="button"
          className={"absolute undo option " + (!isSet ? "active" : "disabled")}
          disabled={isSet}
          onMouseDown={() => {
            //used onMouseDown instead of onClick because it triggers before onBlur.
            setIsSet(true);
            setValue(author);
            setShowOptions(false);
          }}
        >
          ↶
        </button>
      )}
    </form>
  );
}
