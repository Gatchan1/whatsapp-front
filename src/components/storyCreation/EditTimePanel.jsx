import { useContext, useEffect, useState } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import InputNum from "./InputNum";

export default function EditTimePanel() {
  const { story, setAltStory } = useContext(storyCreationContext);

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

  useEffect(() => {
    setAltStory(story);

    setDateCompareBegin(new Date(0));
    setDateCompareEnd(new Date("2250-1-1"));
    setHourDelay(0);
    setMinuteDelay(0);
    setDayDelay(0);
    setMonthDelay(0);
    setYearDelay(0);

    const dateBeginIndex = story.findIndex((message) => message[0]); //first match with checked tickbox
    const dateEndIndex = story.findLastIndex((message) => message[0]); //last match with checked tickbox
    if (dateBeginIndex < 0 || dateEndIndex < 0) return; //This'd be right before unmount, when unchecking the last checkbox on place.
    setDateBegin(new Date(story[dateBeginIndex][1]));
    setDateEnd(new Date(story[dateEndIndex][1]));
    if (dateBeginIndex) setDateCompareBegin(new Date(story[dateBeginIndex - 1][1]));
    if (dateEndIndex != story.length - 1) setDateCompareEnd(new Date(story[dateEndIndex + 1][1])); //It's important to make new Date objects here.
    //(I bet it's because I alter "story" through deep copies a lot, and there aren't Date objects in JSON)
  }, [story]);
  //dateBegin is the date corresponding to the first ticked box.
  //dateEnd is the date corresponding to the last ticked box.
  //dateCompareBegin is the date corresponding to the date PREVIOUS to the first ticked one (in case the first ticked one isn't the first date in the whole story!).
  //dateCompareEnd is the date corresponding to the date that FOLLOWS the last ticked one (in case the last ticked one isn't the last date in the whole story!).

  return (
    <div id="scroll-time" className="bottom-margin">
      <h5 className="no-margin">Apply time delay</h5>
      <div className="row">
        <div className="column">
          <label htmlFor="hours">Hours</label>
          <InputNum delay={hourDelay} setDelay={setHourDelay} hour={true} />
          {/* no se si poner lo de "hour"(/minutes lo que sea) asi
          o si poner algo como type={"hour"} 
          asi podré usar un switch y queda mucho mas legible*/}
        </div>
        <div>:</div>
        <div className="column">
          <label htmlFor="minutes">Minutes</label>
          <InputNum delay={minuteDelay} setDelay={setMinuteDelay} />
        </div>
        <div className="left-margin column">
          <label htmlFor="day">Day</label>
          <InputNum delay={dayDelay} setDelay={setDayDelay} />
        </div>
        <div>/</div>
        <div className="column">
          <label htmlFor="month">Month</label>
          <InputNum delay={monthDelay} setDelay={setMonthDelay} />
        </div>
        <div>/</div>
        <div className="column">
          <label htmlFor="year">Year</label>
          <InputNum delay={yearDelay} setDelay={setYearDelay} />
        </div>
        <button className="apply-btn">Apply delay</button>
        {/* TODO: set up button logic */}
      </div>
    </div>
  );
}
