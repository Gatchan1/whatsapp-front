import { useContext, useEffect, useState } from "react";
import StoryCopyPaste from "../components/storyCreation/StoryCopyPaste";
import StoryWrite from "../components/storyCreation/StoryWrite";
import { storyCreationContext } from "../contexts/storyCreation.context";

export default function CreatePage() {
  const { setStory } = useContext(storyCreationContext);
  const [copyPasting, setCopyPasting] = useState(null); // boolean
  const [showMenu, setShowMenu] = useState(true); // boolean

  useEffect(() => {
    return setStory(null); //unmounting stage!
  }, []);

  return (
    <div>
      <h2>CreatePage</h2>
      {showMenu && (
        <div>
          <button
            onClick={() => {
              setCopyPasting(true);
              setShowMenu(false);
            }}
          >
            Start from a real whatsapp conversation
          </button>
          <button
            onClick={() => {
              setCopyPasting(false);
              setShowMenu(false);
            }}
            className="leftMargin"
          >
            Start from scratch
          </button>
        </div>
      )}
      {!showMenu && copyPasting && <StoryCopyPaste setCopyPasting={setCopyPasting} />}
      {!showMenu && !copyPasting && <StoryWrite />}
    </div>
  );
}
