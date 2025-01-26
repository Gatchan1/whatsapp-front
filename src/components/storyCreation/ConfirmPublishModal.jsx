import { storyCreationContext } from "../../contexts/storyCreation.context";
import { useContext } from "react";

export default function ConfirmPublishModal({ setShowConfirmPublish, setShowOptionsPublish }) {
  const { setCollectedMidEditAuthors, setCollectedMidEditComments, setSubmitEditingFields } = useContext(storyCreationContext);

  const handleContinuePublish = () => {
    setShowOptionsPublish(true);
    setShowConfirmPublish(false);
  };

  const handleRejectPublish = () => {
    setCollectedMidEditAuthors({ isSet: false });
    setCollectedMidEditComments({ isSet: false });
    setSubmitEditingFields(false);
    setShowConfirmPublish(false);
  };

  return (
    <div
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleRejectPublish();
      }}
    >
      <div className="modal-content">
        <div className="close-button-container">
          <button onClick={handleRejectPublish}>close</button>
        </div>
        <div>
          <h1>Are you sure?</h1>
          <p>It looks like you didn't finish editing some author names or messages content.</p>
          <p>Are you sure you want to go ahead and publish everything as it is?</p>
          <div>
            <button onClick={handleContinuePublish}>Yes, publish</button>
            <button onClick={handleRejectPublish}>No, go back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
