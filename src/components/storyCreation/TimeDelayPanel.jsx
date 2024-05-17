import { useContext, useEffect } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import InputDelay from "./InputDelay";
import useApplyDelays from "../../hooks/useApplyDelays";

export default function TimeDelayPanel() {
  const { story } = useContext(storyCreationContext);

  const {
    hourDelay,
    minuteDelay,
    dayDelay,
    monthDelay,
    yearDelay,

    setHourDelay,
    setMinuteDelay,
    setDayDelay,
    setMonthDelay,
    setYearDelay,
  } = useContext(timeScrollContext);

  useEffect(() => { //reset delays when story is updated.
    setHourDelay(0);
    setMinuteDelay(0);
    setDayDelay(0);
    setMonthDelay(0);
    setYearDelay(0);
  }, [story]);

  useApplyDelays();

  return (
    <div id="scroll-time" className="bottom-margin">
      <h5 className="no-margin">Apply time delay (scroll up or down!)</h5>
      <div className="row">
        <div className="column">
          <label htmlFor="hours">Hours</label>
          <InputDelay delay={hourDelay} setDelay={setHourDelay} unit="hours" />
        </div>
        <div>:</div>
        <div className="column">
          <label htmlFor="minutes">Minutes</label>
          <InputDelay delay={minuteDelay} setDelay={setMinuteDelay} unit="minutes" />
        </div>
        <div className="left-margin column">
          <label htmlFor="day">Day</label>
          <InputDelay delay={dayDelay} setDelay={setDayDelay} unit="date" />
        </div>
        <div>/</div>
        <div className="column">
          <label htmlFor="month">Month</label>
          <InputDelay delay={monthDelay} setDelay={setMonthDelay} unit="month" />
        </div>
        <div>/</div>
        <div className="column">
          <label htmlFor="year">Year</label>
          <InputDelay delay={yearDelay} setDelay={setYearDelay} unit="year" />
        </div>
      </div>
    </div>
  );
}
