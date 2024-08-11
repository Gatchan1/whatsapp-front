import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../../contexts/storyCreation.context";

export default function EditAuthorGlobal({ author }) {
  const { story, setStory, storyCopy, retrieveUniqueAuthors } = useContext(storyCreationContext);
  const [value, setValue] = useState(author);
  const [showOptions, setShowOptions] = useState(false);
  const [isSet, setIsSet] = useState(true);

  useEffect(() => {
    setValue(author);
  }, [story, author]);

  const updateAll = () => {
    const newStory = storyCopy();
    for (let i = 0; i < story.length; i++) {
      if (newStory[i][2] == author) {
        newStory[i][2] = value;
      }
    }
    setStory(newStory);
    retrieveUniqueAuthors(newStory);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && value !== "") {
      updateAll();
    }
  };

  return (
    <form className="author-global relative" onSubmit={(e) => e.preventDefault()} onBlur={() => setShowOptions(false)}>
      <input
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
