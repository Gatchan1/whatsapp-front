import { createContext, useState } from "react";

const storyCreationContext = createContext();

function StoryCreationProviderWrapper({ children }) {
  const [story, setStory] = useState(null);
  const [altStory, setAltStory] = useState(null);
  //"story" is an array of the conversation messages.
  // Each message in "story" is structured like this: [time checkbox (is it checked: true/false), time, author, comment]

  const exposedValues = { story, setStory, altStory, setAltStory };
  return <storyCreationContext.Provider value={exposedValues}>{children}</storyCreationContext.Provider>;
}

export { storyCreationContext, StoryCreationProviderWrapper };
