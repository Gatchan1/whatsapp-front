import { useContext, useEffect, useState } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function EditTime({ checkbox, time, index, setShowScrollPanel }) {
  const { story, tempStory, setStory, storyCopy } = useContext(storyCreationContext);
  const { setDateCompareBegin, setDateCompareEnd } = useContext(timeScrollContext);
  const [showArrows, setShowArrows] = useState(false);
  const [value, setValue] = useState("Sun, March 31, 2024 at 1:57 PM");

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

    setValue(
      new Intl.DateTimeFormat("en", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(time)
    );
  }, [story, tempStory]);

  const assignDateLimits = (newStory) => {
    const dateBeginIndex = newStory.findIndex((message) => message[0]); //first match with checked tickbox
    const dateEndIndex = newStory.findLastIndex((message) => message[0]); //last match with checked tickbox
    //if (dateBeginIndex < 0 || dateEndIndex < 0) return; //This'd be right before unmount, when unchecking the last checkbox on place.
    if (dateBeginIndex > 0) { // that's to say dateBeginIndex != 0
      setDateCompareBegin(newStory[dateBeginIndex - 1][1]);
    } else {
      setDateCompareBegin(new Date(0));
    }
    
    if (dateEndIndex != newStory.length - 1 && !(dateEndIndex < 0)) {
      setDateCompareEnd(newStory[dateEndIndex + 1][1]);
    } else {
      setDateCompareEnd(new Date("2250-1-1"));
    }
  }

  const handleCheckbox = () => {
    const newStory = storyCopy();
    newStory[index][0] = !checkbox;
    setStory(newStory);
    assignDateLimits(newStory);
  };

  const handleUpstream = () => {
    const newStory = storyCopy();
    for (let i = 0; i <= index; i++) {
      newStory[i][0] = !checkbox;
    }
    setStory(newStory);
    assignDateLimits(newStory);
  };
  const handleDownstream = () => {
    const newStory = storyCopy();
    for (let i = index; i < story.length; i++) {
      newStory[i][0] = !checkbox;
    }
    setStory(newStory);
    assignDateLimits(newStory);
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
      <input size={value.length - 3} value={value} readOnly />
    </form>
  );
}
