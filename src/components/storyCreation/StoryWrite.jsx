import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import Message from "./Message";
import AuthorsPanel from "./AuthorsPanel";
import EditTimePanel from "./EditTimePanel";

export default function StoryWrite() {
  const { story, altStory, setAltStory, storyDeepCopy } = useContext(storyCreationContext);
  const [showScrollPanel, setShowScrollPanel] = useState(false);
  // let uniqueKey = 1; //key={uniqueKey++}

  useEffect(() => {
    // const newStory = JSON.parse(JSON.stringify(story));
    // newStory.forEach(element => {
    //   element[1] = new Date(element[1]);
    // });
    setAltStory(storyDeepCopy());
    console.log("copying altstoryyy", storyDeepCopy())
  }, [story]);

  return (
    <div>
      <h3>StoryWrite</h3>
      {showScrollPanel && <EditTimePanel />}
      {altStory && altStory.map((message, i) => <Message key={i} index={i} message={message} setShowScrollPanel={setShowScrollPanel} />)}
      <br />

      {story && <AuthorsPanel />}
    </div>
  );
}
