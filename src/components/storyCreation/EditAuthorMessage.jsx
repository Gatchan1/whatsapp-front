import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import SelectAuthors from "./SelectAuthors";

export default function EditAuthorMessage({ author, index }) {
  const { story, setStory, storyCopy, retrieveUniqueAuthors } = useContext(storyCreationContext);
  const [showOptions, setShowOptions] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [value, setValue] = useState(author);
  const [bgColor, setBgColor] = useState("set");

  useEffect(() => {
    setValue(author);
    setBgColor("set");
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

  const newAuthor = () => {
    const newStory = storyCopy();
    newStory[index][2] = value;
    setStory(newStory);
    retrieveUniqueAuthors(newStory);
  };

  const selectOne = (chosenAuthor) => {
    const newStory = storyCopy();
    newStory[index][2] = chosenAuthor;
    setStory(newStory);
    retrieveUniqueAuthors(newStory);
    setShowOptions(false);
    setShowSelect(false);
  };

  function Options() {
    return (
      <div className="absolute row options">
        <button className="relative option" onClick={updateAll}>
          🪄
        </button>
        <button className="relative option" onClick={newAuthor}>
          ➕
        </button>
        <button className="relative option" onClick={() => setShowSelect(!showSelect)}>
          ▼
        </button>
        <div>{showSelect && <SelectAuthors selectOne={selectOne} />}</div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative author"
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => {
          setShowOptions(false);
          setShowSelect(false);
        }}
      >
        {showOptions && <Options />}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => {
              if (e.target.value != author) {
                setBgColor("unset");
              } else {
                setBgColor("set");
              }
              setValue(e.target.value);
            }}
            className={bgColor}
            size={value.length}
            value={value}
          />
        </form>
      </div>
    </div>
  );
}
