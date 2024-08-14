import { createContext, useState } from "react";

const storyCreationContext = createContext();

function StoryCreationProviderWrapper({ children }) {
  const [story, setStory] = useState(null);
  /* "story" is an array of the conversation messages.
  Each message in "story" is structured like this:
  [time checkbox (is it checked: true/false),
    id (meant to be used as key when rendering a list),
    time,
    author,
    comment]*/
  const [tempStory, setTempStory] = useState(null);
  /* "tempStory" exists so that we aren't constantly updating story while scrolling a time delay.
  Updating story affects more & different re-renderings than updating tempStory.*/
  const [uniqueAuthors, setUniqueAuthors] = useState([]);
  const [submitEditingFields, setSubmitEditingFields] = useState(false);
  /* "submitEditingFields"' purpose is to trigger the submitting of any author or comment
  that were mid editing, right before publishing a story. */
  const [collectedMidEditAuthors, setCollectedMidEditAuthors] = useState({});
  const [collectedMidEditComments, setCollectedMidEditComments] = useState({});

  const storyCopy = (data = story) => {
    const newStory = JSON.parse(JSON.stringify(data));
    newStory.forEach((element) => {
      element[2] = new Date(element[2]);
    });
    return newStory;
  };

  const retrieveUniqueAuthors = (newStory) => {
    const currentAuthors = newStory.map((message) => message[3]);
    setUniqueAuthors([...new Set(currentAuthors)]);
  };

  const exposedValues = { story, setStory, tempStory, setTempStory, storyCopy, uniqueAuthors, retrieveUniqueAuthors, submitEditingFields, setSubmitEditingFields, collectedMidEditAuthors, setCollectedMidEditAuthors, collectedMidEditComments, setCollectedMidEditComments };
  return <storyCreationContext.Provider value={exposedValues}>{children}</storyCreationContext.Provider>;
}

export { storyCreationContext, StoryCreationProviderWrapper };
