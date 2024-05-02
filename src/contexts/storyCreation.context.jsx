import { createContext, useState } from "react";

const storyCreationContext = createContext();

function StoryCreationProviderWrapper({ children }) {
  const [story, setStory] = useState(null);
  const [tempStory, setTempStory] = useState(null);
  //"story" is an array of the conversation messages.
  // Each message in "story" is structured like this: [time checkbox (is it checked: true/false), time, author, comment]

  const storyCopy = (data = story) => {
    const newStory = JSON.parse(JSON.stringify(data));
    newStory.forEach(element => {
      element[1] = new Date(element[1]);
    });
    return newStory;
  }

  const exposedValues = { story, setStory, tempStory, setTempStory, storyCopy };
  return <storyCreationContext.Provider value={exposedValues}>{children}</storyCreationContext.Provider>;
}

export { storyCreationContext, StoryCreationProviderWrapper };
