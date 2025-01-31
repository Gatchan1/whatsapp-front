import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import { authContext } from "../../contexts/auth.context";

export default function OptionsPublishModal({ setShowOptionsPublish }) {
  const { baseUrl, isLoggedIn, user } = useContext(authContext);
  const { tempStory, storyCopy, chosenPov, collectedMidEditAuthors, setCollectedMidEditAuthors, collectedMidEditComments, setCollectedMidEditComments, setSubmitEditingFields } = useContext(storyCreationContext);
  const [isStoryPrivate, setIsStoryPrivate] = useState(null);
  const [isStorySigned, setIsStorySigned] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let areValuesSet;
    if (!isLoggedIn) {
      setIsStorySigned(false);
      areValuesSet = isStoryPrivate !== null;
    } else {
      areValuesSet = isStoryPrivate ? true : isStorySigned !== null;
    }
    setIsReady(areValuesSet);
  }, [isStoryPrivate, isStorySigned]);

  function ChoosePrivacity() {
    return (
      <div>
        <p>va a ser public o privada?</p>
        <form>
          <label htmlFor="public">Public</label>
          <input type="radio" id="public" name="privacity" onChange={()=> setIsStoryPrivate(false)} checked={!isStoryPrivate && isStoryPrivate !== null}/>
          <label htmlFor="private">Private</label>
          <input type="radio" id="private" name="privacity" onChange={()=> {
            setIsStoryPrivate(true);
            setIsStorySigned(null);
            }} checked={isStoryPrivate}/>
        </form>
      </div>
    );
  }

  function ChooseAnonimity() {
    return (
      <div className={!isStoryPrivate && isStoryPrivate !== null ? "" : "disabled"}>
        <p>holi {user.name}, elige anonimato o no jeje</p>
        <form>
          <label htmlFor="signed">Signed</label>
          <input type="radio" id="signed" name="anonimity" onChange={()=> setIsStorySigned(true)} checked={isStorySigned} disabled={isStoryPrivate || isStoryPrivate === null}/>
          <label htmlFor="anonymous">Anonymous</label>
          <input type="radio" id="anonymous" name="anonimity" onChange={()=> setIsStorySigned(false)} checked={!isStorySigned && isStorySigned !== null} disabled={isStoryPrivate || isStoryPrivate === null}/>
        </form>
      </div>
    );
  }

  const getEditsSubmittedStory = () => {
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
      private: isStoryPrivate,
      signed: isStorySigned ? true : false,
      ...(isLoggedIn && { user: user._id }), 
      tags: [],
    };
    axios
      .post(`${baseUrl}/story/`, data)
      .then(({ data }) => {
        if (isStoryPrivate) navigate("/story/" + data.uuid);
        else navigate("/story/" + data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRejectPublish = () => {
    setCollectedMidEditAuthors({ isSet: false });
    setCollectedMidEditComments({ isSet: false });
    setSubmitEditingFields(false);
    setShowOptionsPublish(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-button-container">
          <button onClick={handleRejectPublish}>close</button>
        </div>
        <h4>Ok, we are almost there!</h4>
        <h4>Please choose this before actually publishing:</h4>
        <ChoosePrivacity />
        {isLoggedIn && <ChooseAnonimity />}
        <button disabled={!isReady} className={isReady ? "" : "disabled"} onClick={publishStory}>
          Publish
        </button>
      </div>
    </div>
  );
}