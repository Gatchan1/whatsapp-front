import { useContext, useEffect, useRef, useState } from "react";
import { storyCreationContext } from "../../../contexts/storyCreation.context";
import SelectAuthors from "./SelectAuthors";

export default function EditAuthorMessage({ author, index }) {
  const { story, setStory, storyCopy, retrieveUniqueAuthors, submitEditingFields, setCollectedMidEditAuthors } = useContext(storyCreationContext);
  const [showOptions, setShowOptions] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [authorSize, setAuthorSize] = useState(6);
  const [authorValue, setAuthorValue] = useState(author);
  const [isSet, setIsSet] = useState(true);
  const inputRef = useRef(null);
  const [ignoreBlur, setIgnoreBlur] = useState(false);

  useEffect(() => {
    isSet ? setCollectedMidEditAuthors((prevData) => ({ ...prevData, isSet: true })) : setCollectedMidEditAuthors((prevData) => ({ ...prevData, [index]: authorValue, isSet: true }));
  }, [submitEditingFields]);

  useEffect(() => {
    // This useEffect is for author updating through the AuthorsPanel.
    setAuthorValue(author);
    setIsSet(true);
  }, [author]);

  useEffect(() => {
    if (authorValue.length > 5 && authorValue.length < 30) setAuthorSize(authorValue.length);
  }, [authorValue]);

  const update = (someStory) => {
    setStory(someStory);
    retrieveUniqueAuthors(someStory);
    setIsSet(true);
  };

  const updateAll = () => {
    const newStory = storyCopy();
    for (let i = 0; i < story.length; i++) {
      if (newStory[i][3] == author) {
        newStory[i][3] = authorValue;
      }
    }
    update(newStory);
  };
  const newAuthor = () => {
    const newStory = storyCopy();
    newStory[index][3] = authorValue;
    update(newStory);
  };
  const selectOne = (chosenAuthor) => {
    const newStory = storyCopy();
    newStory[index][3] = chosenAuthor;
    update(newStory);
    setAuthorValue(chosenAuthor);
    setShowOptions(false);
    setShowSelect(false);
  };

  const handleSelectAuthorsMouseDown = () => {
    setIgnoreBlur(true);
    setTimeout(() => {
      setIgnoreBlur(false);
    }, 10);
    setShowSelect(!showSelect);
  };

  function Options() {
    return (
      <div className="absolute row author-options">
        <button type="button" className={"option " + (isSet ? "disabled" : "")} disabled={isSet} onMouseDown={updateAll}>
          🪄
        </button>
        <button type="button" className={"option " + (isSet ? "disabled" : "")} disabled={isSet} onMouseDown={newAuthor}>
          ➕
        </button>
        <button type="button" className="option" onMouseDown={handleSelectAuthorsMouseDown}>
          ▼
        </button>
        <div>{showSelect && <SelectAuthors selectOne={selectOne} />}</div>
      </div>
    );
  }

  const handleBlur = () => {
    if (ignoreBlur) {
      inputRef.current.focus();
      setIgnoreBlur(false);
    } else {
      setShowOptions(false);
      setShowSelect(false);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.value != author) {
      setIsSet(false);
    } else {
      setIsSet(true);
    }
    setAuthorValue(e.target.value);
  };

  return (
    <div>
      <div className="relative author">
        {showOptions && <Options />}
        <form onSubmit={(e) => e.preventDefault()}>
          <input ref={inputRef} onFocus={() => setShowOptions(true)} onBlur={handleBlur} onChange={handleOnChange} className={isSet ? "set" : "unset"} size={authorSize} value={authorValue} />
        </form>
      </div>
    </div>
  );
}
