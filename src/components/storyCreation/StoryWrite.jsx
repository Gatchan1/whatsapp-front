import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import Message from "./Message";
import AuthorsPanel from "./AuthorsPanel";
import TimeDelayPanel from "./TimeDelayPanel";
import NewMessage from "./NewMessage";

export default function StoryWrite() {
  const { story, tempStory, setTempStory, storyCopy } = useContext(storyCreationContext);
  const [showScrollPanel, setShowScrollPanel] = useState(false);

  useEffect(() => {
    setTempStory(storyCopy());
  }, [story]);

  useEffect(() => {
    let firstGroup = false;
    let gap = false;
    let secondGroup = false;
    story.forEach((message) => {
      if (message[0] && !firstGroup) firstGroup = true;
      if (!message[0] && firstGroup) gap = true;
      if (message[0] && gap) secondGroup = true;
    });
    if (firstGroup && !secondGroup) setShowScrollPanel(true);
    else setShowScrollPanel(false);
  }, [story]);

  return (
    <div>
      <h3>StoryWrite</h3>
      {showScrollPanel && <TimeDelayPanel />}
      {tempStory && tempStory.map((message, i) => <Message key={i} index={i} message={message} />)}
      <br />
      <NewMessage />
      <br />
      {story && <AuthorsPanel />}
    </div>
  );
}
