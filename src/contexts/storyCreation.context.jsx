import { createContext, useState } from "react";

const storyCreationContext = createContext();

function StoryCreationProviderWrapper({ children }) {
  const [story, setStory] = useState(null);
  const [authors, setAuthors] = useState(null);
  //"story" is an array of the conversation messages.
  // Each message in "story" is structured like this: [time, author, comment]

  const exposedValues = { story, setStory, setAuthors };
  return <storyCreationContext.Provider value={exposedValues}>{children}</storyCreationContext.Provider>;
}

export { storyCreationContext, StoryCreationProviderWrapper };
