import { useContext } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function StoryWrite() {
  const { story } = useContext(storyCreationContext);

  return (
    <div>
      <h3>StoryWrite</h3>
      {story && story.map((message, i) => <div key={i}>{message}</div>)}
    </div>
  );
}
