import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import { authContext } from "../../contexts/auth.context";
import AuthorsPanel from "./authorEditing/AuthorsPanel";
import TimeDelayPanel from "./TimeDelayPanel";
import NewMessage from "./NewMessage";
import MessageBundle from "./MessageBundle";
import ConfirmPublishModal from "./ConfirmPublishModal";

export default function StoryWrite() {
  const { story, setStory, tempStory, setTempStory, storyCopy, chosenPov, setSubmitEditingFields, collectedMidEditAuthors, collectedMidEditComments } = useContext(storyCreationContext);
  const { baseUrl, authenticateUser, isLoggedIn } = useContext(authContext);
  const [showScrollPanel, setShowScrollPanel] = useState(false);
  const [canPublish, setCanPublish] = useState(false);
  const [showConfirmPublishModal, setShowConfirmPublishModal] = useState(false);
  const navigate = useNavigate();

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
        setShowConfirmPublishModal(true);
      } else {
        publishStory();
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

  const getEditsSubmittedStory = () => {
    // "index" refers to the position this type of data occupies in a message array.
    const newStory = storyCopy(tempStory); // this way we don't lose a possible time edit.
    for (let i = 0; i < newStory.length; i++) {
      if (collectedMidEditAuthors[i]) {
        newStory[i][3] = collectedMidEditAuthors[i];
      }
    }
    for (let i = 0; i < newStory.length; i++) {
      if (collectedMidEditComments[i]) {
        newStory[i][4] = collectedMidEditComments[i];
      }
    }
    return newStory;
  };

  const publishStory = () => {
    const cleanStory = getEditsSubmittedStory().map((message) => message.slice(2));
    // We don't need to store ids nor checkboxes in DB. This way we save space.
    const data = {
      body: JSON.stringify(cleanStory),
      pov: chosenPov,
      private: false,
      signed: false,
      tags: [],
    };
    axios
      .post(`${baseUrl}/story/`, data)
      .then(({ data }) => {
        console.log("story created", data, "\n and pov is ", chosenPov);
        navigate("/story/" + data._id);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <button onClick={() => setSubmitEditingFields(true)} disabled={!canPublish} >Publish Story</button>
      {showConfirmPublishModal && <ConfirmPublishModal setShowConfirmPublishModal={setShowConfirmPublishModal} publishStory={publishStory} />}
      <hr />
    </div>
  );
}
