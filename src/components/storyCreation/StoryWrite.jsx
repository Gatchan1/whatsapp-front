import { useContext } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import Message from "./Message";
import AuthorsPanel from "./AuthorsPanel";

export default function StoryWrite() {
  const { story } = useContext(storyCreationContext);

  return (
    <div>
      <h3>StoryWrite</h3>
      {story && story.map((message, i) => <Message key={i} message={message} />)}
      <br />

      {story && <AuthorsPanel />}
    </div>
  );
}
