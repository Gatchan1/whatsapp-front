import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import Message from "./Message";
import AuthorsPanel from "./AuthorsPanel";
import EditTimePanel from "./EditTimePanel";

export default function StoryWrite() {
  const { story, tempStory, setTempStory, storyCopy } = useContext(storyCreationContext);
  const [showScrollPanel, setShowScrollPanel] = useState(false);

  useEffect(() => {
    // const newStory = JSON.parse(JSON.stringify(story));
    // newStory.forEach(element => {
    //   element[1] = new Date(element[1]);
    // });
    setTempStory(storyCopy());
    console.log("copying altstoryyy", storyCopy())
  }, [story]);

  return (
    <div>
      <h3>StoryWrite</h3>
      {showScrollPanel && <EditTimePanel />}
      {tempStory && tempStory.map((message, i) => <Message key={i} index={i} message={message} setShowScrollPanel={setShowScrollPanel} />)}
      <br />

      {story && <AuthorsPanel />}
    </div>
  );
}
