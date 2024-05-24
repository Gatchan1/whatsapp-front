import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function EditComment({ comment, index }) {
  const { story, setStory, storyCopy, retrieveUniqueAuthors } = useContext(storyCreationContext);
  const [value, setValue] = useState(comment);
  const [showOptions, setShowOptions] = useState(false);
  const [bgColor, setBgColor] = useState("set");

  const updateMessage = () => {
    const newStory = storyCopy();
    newStory[index][3] = value;
    setStory(newStory);
    setBgColor("set");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateMessage();
    }
  };

  function Options() {
    return (
      <div className="inline">
        <button type="button" className={"enter option " + (bgColor === "unset" ? "active" : "disabled")} disabled={bgColor === "set" ? "true" : ""} onMouseDown={updateMessage}>
          ✔️
        </button>
        <button
          type="button"
          className={"undo option " + (bgColor === "unset" ? "active" : "disabled")}
          disabled={bgColor === "set" ? "true" : ""}
          //(writing "false" returns true for being a non-empty string)
          onMouseDown={() => {
            //used onMouseDown instead of onClick because it triggers before onBlur.
            setBgColor("set");
            setValue(comment);
            setShowOptions(false);
          }}
        >
          ↶
        </button>
      </div>
    );
  }

  return (
    <form onBlur={() => setShowOptions(false)}>
      <input
        size={value.length}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value != comment) {
            setBgColor("unset");
          } else {
            setBgColor("set");
          }
        }}
        onFocus={() => setShowOptions(true)}
        onKeyDown={handleEnter}
        className={bgColor}
      />
      {showOptions && <Options />}
    </form>
  );
}

//TODO: lots!! have to end up updating story!!
//add onKeyDown!!!
