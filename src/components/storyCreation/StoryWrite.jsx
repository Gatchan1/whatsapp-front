import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import { authContext } from "../../contexts/auth.context";
import AuthorsPanel from "./authorEditing/AuthorsPanel";
import TimeDelayPanel from "./TimeDelayPanel";
import NewMessage from "./NewMessage";
import MessageBundle from "./MessageBundle";

export default function StoryWrite() {
  const { story, setStory, tempStory, setTempStory, storyCopy } = useContext(storyCreationContext);
  const { baseUrl, authenticateUser, isLoggedIn } = useContext(authContext);
  const [showScrollPanel, setShowScrollPanel] = useState(false);
  const navigate = useNavigate();

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

  const handlePublishStory = () => {
    // TODO: creo que lo adecuado es publicar tempStory en lugar de story, pero quizás me equivoque. Estar al loro!
    const noCheckboxesStory = tempStory.map(message => message.slice(1));
    // We save a little bit of space in the DB if we don't store checkboxes.
    const data = {
      body: JSON.stringify(noCheckboxesStory),
      private: false,
      signed: false,
      tags: []
    }
    axios
      .post(`${baseUrl}/story/`, data)
      .then(({data}) => {
        //console.log("story created", data);
        navigate("/story/" + data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h3>StoryWrite</h3>
      {showScrollPanel && <TimeDelayPanel />}
      {tempStory && tempStory.map((message, i) => <MessageBundle key={i + message[3]} index={i} message={message} />)}
      {/* only using i as key would give us trouble when inserting new messages */}
      <br />
      <p>Add new message:</p>
      <NewMessage />
      <br />
      <button onClick={handlePublishStory}>Publish Story</button>
      {story && <AuthorsPanel />}
    </div>
  );
}
