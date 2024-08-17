import { useContext, useEffect, useState } from "react";
import { timeScrollContext } from "../../../contexts/timeScroll.context";
import { storyCreationContext } from "../../../contexts/storyCreation.context";

export default function EditTime({ checkbox, time, index }) {
  const { story, tempStory, setStory, storyCopy } = useContext(storyCreationContext);
  const { setDateCompareBegin, setDateCompareEnd } = useContext(timeScrollContext);
  const [showArrows, setShowArrows] = useState(false);
  const [value, setValue] = useState("Sun, March 31, 2024 at 1:57 PM");

  useEffect(() => {
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
  }, [tempStory]);

  const assignDateLimits = (newStory) => {
    const dateBeginIndex = newStory.findIndex((message) => message[0]); //first match with checked tickbox
    const dateEndIndex = newStory.findLastIndex((message) => message[0]); //last match with checked tickbox
    if (dateBeginIndex > 0) { // that's to say dateBeginIndex != 0
      setDateCompareBegin(newStory[dateBeginIndex - 1][2]);
    } else {
      setDateCompareBegin(new Date(0));
    }
    
    if (dateEndIndex != newStory.length - 1 && !(dateEndIndex < 0)) {
      setDateCompareEnd(newStory[dateEndIndex + 1][2]);
    } else {
      setDateCompareEnd(new Date("2250-1-1"));
    }
  }

  const handleCheckbox = () => {
    const newStory = storyCopy(tempStory);
    newStory[index][0] = !checkbox;
    setStory(newStory);
    assignDateLimits(newStory);
  };

  const handleUpstream = () => {
    const newStory = storyCopy(tempStory);
    for (let i = 0; i <= index; i++) {
      newStory[i][0] = !checkbox;
    }
    setStory(newStory);
    assignDateLimits(newStory);
  };
  
  const handleDownstream = () => {
    const newStory = storyCopy(tempStory);
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
      <input className="date" size={value.length} value={value} readOnly />
    </form>
  );
}
