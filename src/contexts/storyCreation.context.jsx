import { createContext, useState } from "react";

const storyCreationContext = createContext();

function StoryCreationProviderWrapper({ children }) {
  const [story, setStory] = useState(null);
  const [tempStory, setTempStory] = useState(null);
  const [uniqueAuthors, setUniqueAuthors] = useState([]);
  //"story" is an array of the conversation messages.
  // Each message in "story" is structured like this: [time checkbox (is it checked: true/false), time, author, comment]

  const storyCopy = (data = story) => {
    const newStory = JSON.parse(JSON.stringify(data));
    newStory.forEach(element => {
      element[1] = new Date(element[1]);
    });
    return newStory;
  }

  const retrieveUniqueAuthors = (newStory) => {
    const currentAuthors = newStory.map((message) => message[2]);
    setUniqueAuthors([...new Set(currentAuthors)]);
  };

  const exposedValues = { story, setStory, tempStory, setTempStory, storyCopy, uniqueAuthors, retrieveUniqueAuthors };
  return <storyCreationContext.Provider value={exposedValues}>{children}</storyCreationContext.Provider>;
}

export { storyCreationContext, StoryCreationProviderWrapper };
