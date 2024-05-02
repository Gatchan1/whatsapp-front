import { useContext, useEffect, useState } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import InputNum from "./InputNum";

export default function EditTimePanel() {
  const { story, setStory, tempStory, setTempStory, storyCopy } = useContext(storyCreationContext);

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
    setDateEnd,
  } = useContext(timeScrollContext);

  useEffect(() => {
    //setDateCompareBegin(new Date(0));
    //setDateCompareEnd(new Date("2250-1-1"));
    setHourDelay(0);
    setMinuteDelay(0);
    setDayDelay(0);
    setMonthDelay(0);
    setYearDelay(0);
  }, [story]);

  useEffect(() => {}, []);

  useEffect(() => {
    const delayMgmt = [
      { value: yearDelay, getMethod: "getFullYear", setMethod: "setFullYear" },
      { value: monthDelay, getMethod: "getMonth", setMethod: "setMonth" },
      { value: dayDelay, getMethod: "getDate", setMethod: "setDate" },
      { value: hourDelay, getMethod: "getHours", setMethod: "setHours" },
      { value: minuteDelay, getMethod: "getMinutes", setMethod: "setMinutes" },
    ];
    const storyCopy = JSON.parse(JSON.stringify(story));
    let foundFirstCheckbox = false;
    let foundLastCheckbox = false;
    const newAltStory = [];
    for (let i = 0; i < storyCopy.length; i++) {
      if (storyCopy[i][0]) {
        const date = new Date(storyCopy[i][1]);
        delayMgmt.forEach((delay) => {
          if (delay.value) {
            const newTime = date[delay.getMethod]() + delay.value;
            date[delay.setMethod](newTime);
          }
        });
        if (!foundFirstCheckbox) {
          foundFirstCheckbox = true;
          // console.log("new date begin!!", date)
          setDateBegin(date);
        }
        if (i == storyCopy.length - 1) {
          setDateEnd(date);
        }
        newAltStory.push([storyCopy[i][0], date, storyCopy[i][2], storyCopy[i][3]]);
      } else {
        if (foundFirstCheckbox && !foundLastCheckbox) {
          foundLastCheckbox = true;
          console.log("new date end!!", newAltStory[i-1][1])
          setDateEnd(newAltStory[i-1][1]);
        }
        newAltStory.push([storyCopy[i][0], new Date(storyCopy[i][1]), storyCopy[i][2], storyCopy[i][3]]);
      }
    }
    setTempStory(newAltStory);
  }, [story, hourDelay, minuteDelay, dayDelay, monthDelay, yearDelay]);

  return (
    <div id="scroll-time" className="bottom-margin">
      <h5 className="no-margin">Apply time delay</h5>
      <div className="row">
        <div className="column">
          <label htmlFor="hours">Hours</label>
          <InputNum delay={hourDelay} setDelay={setHourDelay} unit="hours" />
          {/* no se si poner lo de "hour"(/minutes lo que sea) asi
          o si poner algo como type={"hour"} 
          asi podré usar un switch y queda mucho mas legible*/}
        </div>
        <div>:</div>
        <div className="column">
          <label htmlFor="minutes">Minutes</label>
          <InputNum delay={minuteDelay} setDelay={setMinuteDelay} unit="minutes" />
        </div>
        <div className="left-margin column">
          <label htmlFor="day">Day</label>
          <InputNum delay={dayDelay} setDelay={setDayDelay} unit="date" />
        </div>
        <div>/</div>
        <div className="column">
          <label htmlFor="month">Month</label>
          <InputNum delay={monthDelay} setDelay={setMonthDelay} unit="month" />
        </div>
        <div>/</div>
        <div className="column">
          <label htmlFor="year">Year</label>
          <InputNum delay={yearDelay} setDelay={setYearDelay} unit="year" />
        </div>
        <button className="apply-btn">Apply delay</button>
        {/* TODO: set up button logic */}
      </div>
    </div>
  );
}
