import { useContext, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import SelectAuthors from "./SelectAuthors";

export default function EditAuthorMessage({ author, index }) {
  const { story, setStory, storyCopy, retrieveUniqueAuthors } = useContext(storyCreationContext);
  const [showOptions, setShowOptions] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [authorValue, setAuthorValue] = useState(author);
  const [isSet, setIsSet] = useState(true);

  const update = (data) => {
    setStory(data);
    retrieveUniqueAuthors(data);
    setIsSet(true);
  }

  const updateAll = () => {
    const newStory = storyCopy();
    for (let i = 0; i < story.length; i++) {
      if (newStory[i][2] == author) {
        newStory[i][2] = authorValue;
      }
    }
    update(newStory);
  };
  const newAuthor = () => {
    const newStory = storyCopy();
    newStory[index][2] = authorValue;
    update(newStory);
  };
  const selectOne = (chosenAuthor) => {
    const newStory = storyCopy();
    newStory[index][2] = chosenAuthor;
    update(newStory);
    setShowOptions(false);
    setShowSelect(false);
  };

  function Options() {
    return (
      <div className="absolute row options">
        <button type="button" className="relative option" onClick={updateAll}>
          🪄
        </button>
        <button type="button" className="relative option" onClick={newAuthor}>
          ➕
        </button>
        <button type="button" className="relative option" onClick={() => setShowSelect(!showSelect)}>
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
      {/* TODO: me gusta más el approach que usé para mostrar las opciones del comment!! (onFocus/onBlur), aplicarlo aquí! */}
        {showOptions && <Options />}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => {
              if (e.target.value != author) {
                setIsSet(false);
              } else {
                setIsSet(true);
              }
              setAuthorValue(e.target.value);
            }}
            className={isSet ? "set" : "unset"}
            size={authorValue.length}
            value={authorValue}
          />
        </form>
      </div>
    </div>
  );
}
