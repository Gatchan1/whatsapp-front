import { useContext, useEffect } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";
import { storyCreationContext } from "../../contexts/storyCreation.context";
import InputNum from "./InputNum";
import useApplyDelays from "../../hooks/useApplyDelays";

export default function EditTimePanel() {
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
      <h5 className="no-margin">Apply time delay</h5>
      <div className="row">
        <div className="column">
          <label htmlFor="hours">Hours</label>
          <InputNum delay={hourDelay} setDelay={setHourDelay} unit="hours" />
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
