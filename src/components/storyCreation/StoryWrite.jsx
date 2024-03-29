import { useContext, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import Message from "./Message";
import AuthorsPanel from "./AuthorsPanel";
import EditTimePanel from "./EditTimePanel";

export default function StoryWrite() {
  const { story } = useContext(storyCreationContext);
  const [showScrollPanel, setShowScrollPanel] = useState(false);

  return (
    <div>
      <h3>StoryWrite</h3>
      {showScrollPanel && <EditTimePanel />}
      {story && story.map((message, i) => <Message key={i} index={i} message={message} setShowScrollPanel={setShowScrollPanel}/>)}
      <br />

      {story && <AuthorsPanel />}
    </div>
  );
}
