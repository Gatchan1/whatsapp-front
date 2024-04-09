import { useContext, useEffect, useState } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import InputNum from "./InputNum";

export default function EditTimePanel() {
  const { story, altStory, setAltStory, storyDeepCopy } = useContext(storyCreationContext);

  const {
    hourDelay,
    setHourDelay,
    minuteDelay,
    setMinuteDelay,
    dayDelay,
    setDayDelay,
    monthDelay,
    setMonthDelay,
    yearDelay,
    setYearDelay,

    setDateBegin,
    setDateCompareBegin,
    setDateEnd,
    setDateCompareEnd,
  } = useContext(timeScrollContext);

  useEffect(()=>{
    setAltStory(storyDeepCopy());

    setDateCompareBegin(new Date(0));
    setDateCompareEnd(new Date("2250-1-1"));
    setHourDelay(0);
    setMinuteDelay(0);
    setDayDelay(0);
    setMonthDelay(0);
    setYearDelay(0);
  },[story])

  const [exitHover, setExitHover] = useState(false);

  useEffect(()=>{
    console.log("exitHover ", exitHover)
  },[exitHover])

  useEffect(() => {
    const dateBeginIndex = altStory.findIndex((message) => message[0]); //first match with checked tickbox
    const dateEndIndex = altStory.findLastIndex((message) => message[0]); //last match with checked tickbox
    if (dateBeginIndex < 0 || dateEndIndex < 0) return; //This'd be right before unmount, when unchecking the last checkbox on place.

    const newDateBegin = new Date(altStory[dateBeginIndex][1]);
    //console.log("newDateBegin",newDateBegin);
    setDateBegin(newDateBegin);
    // if (dateBeginIndex >= 0) console.log("dateBegin",new Date(altStory[dateBeginIndex][1]))
    const newDateEnd = new Date(altStory[dateEndIndex][1]);
    //console.log("newDateEnd", newDateEnd);
    setDateEnd(newDateEnd);

    if (dateBeginIndex) { // that's to say dateBeginIndex != 0
      const newDateCompareBegin = new Date(story[dateBeginIndex - 1][1]);
      //console.log("newDateCompareBegin", newDateCompareBegin);
      setDateCompareBegin(newDateCompareBegin);
    }
    if (dateEndIndex != story.length - 1) {
      const newDateCompareEnd = new Date(story[dateEndIndex + 1][1]);
      //console.log("newDateCompareEnd", newDateCompareEnd)
      setDateCompareEnd(newDateCompareEnd); //It's important to make new Date objects here.
    }
    //(I bet it's because I alter "story" through deep copies a lot, and there aren't Date objects in JSON)
    //TODO: look into this, maybe I've changed things so much that---
  }, [altStory]);
  //dateBegin is the date corresponding to the first ticked box.
  //dateEnd is the date corresponding to the last ticked box.
  //dateCompareBegin is the date corresponding to the date PREVIOUS to the first ticked one (in case the first ticked one isn't the first date in the whole story!).
  //dateCompareEnd is the date corresponding to the date that FOLLOWS the last ticked one (in case the last ticked one isn't the last date in the whole story!).

  useEffect(() => {
    const delayMgmt = [
      { value: hourDelay, getMethod: "getHours", setMethod: "setHours" },
      { value: minuteDelay, getMethod: "getMinutes", setMethod: "setMinutes" },
      { value: dayDelay, getMethod: "getDate", setMethod: "setDate" },
      { value: monthDelay, getMethod: "getMonth", setMethod: "setMonth" },
      { value: yearDelay, getMethod: "getFullYear", setMethod: "setFullYear" },
    ];
    const storyCopy = JSON.parse(JSON.stringify(story));
    const newAltStory = storyCopy.map((message) => {
      if (message[0]) {
        const date = new Date(message[1]);
        delayMgmt.forEach((delay) => {
          if (delay.value) {
            const newTime = date[delay.getMethod]() + delay.value;
            date[delay.setMethod](newTime);
          }
        });
        return [message[0], date, message[2], message[3]];
      }
      else return [message[0], new Date(message[1]), message[2], message[3]];
    });
    setAltStory(newAltStory);
    //console.log("aplicado delay years!!", newAltStory);
  }, [story, hourDelay, minuteDelay, dayDelay, monthDelay, yearDelay]);

  return (
    <div id="scroll-time" className="bottom-margin">
      <h5 className="no-margin">Apply time delay</h5>
      <div className="row">
        <div className="column">
          <label htmlFor="hours">Hours</label>
          <InputNum delay={hourDelay} setDelay={setHourDelay} setExitHover={setExitHover} unit="hours" />
          {/* no se si poner lo de "hour"(/minutes lo que sea) asi
          o si poner algo como type={"hour"} 
          asi podré usar un switch y queda mucho mas legible*/}
        </div>
        <div>:</div>
        <div className="column">
          <label htmlFor="minutes">Minutes</label>
          <InputNum delay={minuteDelay} setDelay={setMinuteDelay} setExitHover={setExitHover} unit="minutes" />
        </div>
        <div className="left-margin column">
          <label htmlFor="day">Day</label>
          <InputNum delay={dayDelay} setDelay={setDayDelay} setExitHover={setExitHover} unit="date" />
        </div>
        <div>/</div>
        <div className="column">
          <label htmlFor="month">Month</label>
          <InputNum delay={monthDelay} setDelay={setMonthDelay} setExitHover={setExitHover} unit="month" />
        </div>
        <div>/</div>
        <div className="column">
          <label htmlFor="year">Year</label>
          <InputNum delay={yearDelay} setDelay={setYearDelay} setExitHover={setExitHover} unit="year" />
        </div>
        <button className="apply-btn">Apply delay</button>
        {/* TODO: set up button logic */}
      </div>
    </div>
  );
}
