import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import EditAuthor from "./EditAuthor";

export default function AuthorsPanel() {
  const { story } = useContext(storyCreationContext);
  const [uniqueAuthors, setUniqueAuthors] = useState([]);

  const setAuthors = (story) => {
    const currentAuthors = story.map((message) => message[2]);
    setUniqueAuthors([...new Set(currentAuthors)]);
  };

  useEffect(() => {
    setAuthors(story);
  },[story])

  return (
    <div>
      <h4>Conversation participants</h4>
      {uniqueAuthors.map((author, i) => (
        <EditAuthor author={author} key={i} setUniqueAuthors={setAuthors}/>
      ))}
    </div>
  );
}
