import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import AuthorsPanel from "./authorEditing/AuthorsPanel";
import TimeDelayPanel from "./timeEditing/TimeDelayPanel";
import NewMessage from "./NewMessage";
import MessageBundle from "./MessageBundle";
import ConfirmPublishModal from "./ConfirmPublishModal";
import OptionsPublishModal from "./OptionsPublishModal";
// OptionsPublishModal is the component that has the ability to trigger the actual publishing.

export default function StoryWrite() {
  const { story, tempStory, setTempStory, storyCopy, setSubmitEditingFields, collectedMidEditAuthors, collectedMidEditComments } = useContext(storyCreationContext);
  const [showScrollPanel, setShowScrollPanel] = useState(false);
  const [canPublish, setCanPublish] = useState(false);
  const [showConfirmPublish, setShowConfirmPublish] = useState(false);
  const [showOptionsPublish, setShowOptionsPublish] = useState(false);

  useEffect(() => {
    if (story && story[0]) {
      setTempStory(storyCopy());
      checkShowScrollPanel();
      setCanPublish(true);
    } else {
      setTempStory([]);
      setCanPublish(false);
    }
  }, [story]);

  useEffect(() => {
    // Check if the author and comment values that were mid edit have been processed, prior to publishing.
    if (collectedMidEditAuthors.isSet && collectedMidEditComments.isSet) {
      if (Object.keys(collectedMidEditAuthors).length > 1 || Object.keys(collectedMidEditComments).length > 1) {
        setShowConfirmPublish(true);
      } else {
        setShowOptionsPublish(true);
      }
    }
  }, [collectedMidEditAuthors, collectedMidEditComments]);

  const checkShowScrollPanel = () => {
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
  };

  return (
    <div>
      <h3>StoryWrite</h3>
      {showScrollPanel && <TimeDelayPanel />}
      {tempStory && tempStory.map((message, i) => <MessageBundle key={message[1]} index={i} message={message} />)}
      <br />
      <p>Add new message:</p>
      <NewMessage />
      {story && <AuthorsPanel />}
      <br />
      <button onClick={() => setSubmitEditingFields(true)} disabled={!canPublish} className={canPublish ? "" : "disabled"} >Publish Story</button>
      {showConfirmPublish && <ConfirmPublishModal setShowConfirmPublish={setShowConfirmPublish} setShowOptionsPublish={setShowOptionsPublish} />}
      {showOptionsPublish && <OptionsPublishModal setShowOptionsPublish={setShowOptionsPublish}/>}
      <hr />
    </div>
  );
}
