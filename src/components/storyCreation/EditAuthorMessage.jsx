import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import SelectAuthors from "./SelectAuthors";

export default function EditAuthorMessage({ author, index }) {
  const { story, setStory, storyCopy, retrieveUniqueAuthors } = useContext(storyCreationContext);
  const [isHover, setIsHover] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [value, setValue] = useState(author);

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
    setShowSelect(false);
  }

  function Options() {
    return (
      <div className="absolute row options">
        <button className="relative option" onClick={updateAll}>🪄</button>
        <button className="relative option" onClick={newAuthor}>➕</button>
        <button className="relative option" onClick={() => setShowSelect(!showSelect)}>▼</button>
        <div>{showSelect && <SelectAuthors selectOne={selectOne}/>}</div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative author"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false);
          setShowSelect(false);
        }}
      >
        {isHover && <Options />}
        <form onSubmit={(e) => e.preventDefault()}>
          <input onChange={(e) => setValue(e.target.value)} size={value.length} value={value} />
        </form>
      </div>
    </div>
  );
}
