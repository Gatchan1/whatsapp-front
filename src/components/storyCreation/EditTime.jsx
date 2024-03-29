import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function EditTime({ checkbox, time, index, setShowScrollPanel }) {
  const { story, setStory } = useContext(storyCreationContext);
//   const [value, setValue] = useState(time);
  const [showArrows, setShowArrows] = useState(false);

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

  const handleCheckbox = () => {
    const newStory = JSON.parse(JSON.stringify(story));
    newStory[index][0] = !checkbox;
    setStory(newStory);
  };

  const handleUpstream = () => {
    const newStory = JSON.parse(JSON.stringify(story));
    for (let i = 0; i <= index; i++) {
      newStory[i][0] = !checkbox;
    }
    setStory(newStory);
  };
  const handleDownstream = () => {
    const newStory = JSON.parse(JSON.stringify(story));
    for (let i = index; i < story.length; i++) {
      newStory[i][0] = !checkbox;
    }
    setStory(newStory);
  };

  return (
    <form className="time row" onSubmit={(e) => e.preventDefault()}>
      <div className="row" onMouseLeave={() => setShowArrows(false)}>
        <div className="arrow-space">
          {showArrows && (
            <div>
              <button onClick={handleUpstream}>⬆️</button>
              <button onClick={handleDownstream}>⬇️</button>
            </div>
          )}
        </div>
        <input className="checkbox" type="checkbox" checked={checkbox} onChange={handleCheckbox} onMouseEnter={() => setShowArrows(true)} />
      </div>
      <input defaultValue={time} readOnly /> {/* TODO, test if it changes nicely? */}

    </form>
  );
}
