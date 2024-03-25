import { useContext } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import EditAuthor from "./EditAuthor";

export default function AuthorsPanel() {
  const { story } = useContext(storyCreationContext);
  const currentAuthors = story.map((message) => message[1]);
  const uniqueAuthors = [...new Set(currentAuthors)];

  return (
    <div>
      <h4>Conversation participants</h4>
      {uniqueAuthors.map((author, i) => (
        <EditAuthor author={author} key={i} />
      ))}
    </div>
  );
}
