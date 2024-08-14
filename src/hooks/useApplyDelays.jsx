import { useContext, useEffect } from "react";
import { timeScrollContext } from "../contexts/timeScroll.context";
import { storyCreationContext } from "../contexts/storyCreation.context";

export default function useApplyDelays() {
    const { story, setTempStory, storyCopy } = useContext(storyCreationContext);

    const {
      hourDelay,
      minuteDelay,
      dayDelay,
      monthDelay,
      yearDelay,
  
      setDateBegin,
      setDateEnd,
    } = useContext(timeScrollContext);


    useEffect(() => {
        const delayMgmt = [
          { value: yearDelay, getMethod: "getFullYear", setMethod: "setFullYear" },
          { value: monthDelay, getMethod: "getMonth", setMethod: "setMonth" },
          { value: dayDelay, getMethod: "getDate", setMethod: "setDate" },
          { value: hourDelay, getMethod: "getHours", setMethod: "setHours" },
          { value: minuteDelay, getMethod: "getMinutes", setMethod: "setMinutes" },
        ];
        const storyNewCopy = storyCopy();
        let foundFirstCheckbox = false;
        let foundLastCheckbox = false;
        const newAltStory = [];
        for (let i = 0; i < storyNewCopy.length; i++) {
          if (storyNewCopy[i][0]) {
            const date = storyNewCopy[i][2];
            delayMgmt.forEach((delay) => {
              if (delay.value) {
                const newTime = date[delay.getMethod]() + delay.value;
                date[delay.setMethod](newTime);
              }
            });
            if (!foundFirstCheckbox) {
              foundFirstCheckbox = true;
              setDateBegin(date);
            }
            if (i == storyNewCopy.length - 1) {
              setDateEnd(date);
            }
            newAltStory.push([storyNewCopy[i][0], storyNewCopy[i][1], date, storyNewCopy[i][3], storyNewCopy[i][4]]);
          } else {
            if (foundFirstCheckbox && !foundLastCheckbox) {
              foundLastCheckbox = true;
              setDateEnd(newAltStory[i-1][2]);
            }
            newAltStory.push([storyNewCopy[i][0], storyNewCopy[i][1], storyNewCopy[i][2], storyNewCopy[i][3], storyNewCopy[i][4]]);
          }
        }
        setTempStory(newAltStory);
      }, [story, hourDelay, minuteDelay, dayDelay, monthDelay, yearDelay]);
}
