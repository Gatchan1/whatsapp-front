import { useContext, useEffect } from "react";
import { storyCreationContext } from "../../../contexts/storyCreation.context";
import EditAuthorGlobal from "./EditAuthorGlobal";
import CheckboxAuthors from "./CheckboxAuthors";

export default function AuthorsPanel() {
  const { story, uniqueAuthors, retrieveUniqueAuthors } = useContext(storyCreationContext);

  useEffect(() => {
    retrieveUniqueAuthors(story);
  }, [story]);

  return (
    <div>
      <div id="authors-panel">
        <div className="row">
          <h4 className="participants">Conversation participants</h4>
          <h4>|</h4>
          <h4 className="pov">POV</h4>
        </div>
        <div>
          {uniqueAuthors.map((author, i) => (
            <div key={i} className="row">
              <div className="participant">
                <EditAuthorGlobal author={author} />
              </div>
              <div className="pov">
                <CheckboxAuthors author={author} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
