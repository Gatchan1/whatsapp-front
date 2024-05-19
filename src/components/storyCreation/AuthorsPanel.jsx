import { useContext, useEffect } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import EditAuthorGlobal from "./EditAuthorGlobal";

export default function AuthorsPanel() {
  const { story, uniqueAuthors, retrieveUniqueAuthors } = useContext(storyCreationContext);

  useEffect(() => {
    retrieveUniqueAuthors(story);
  },[story])

  return (
    <div>
      <h4>Conversation participants</h4>
      {uniqueAuthors.map((author, i) => (
        <EditAuthorGlobal author={author} key={i}/>
      ))}
    </div>
  );
}
