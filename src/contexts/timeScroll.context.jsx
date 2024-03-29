import { createContext, useState } from "react";

const timeScrollContext = createContext();

function TimeScrollProviderWrapper({ children }) {
  const [hourDelay, setHourDelay] = useState(0);
  const [minuteDelay, setMinuteDelay] = useState(0);
  const [dayDelay, setDayDelay] = useState(0);
  const [monthDelay, setMonthDelay] = useState(0);
  const [yearDelay, setYearDelay] = useState(0);
  const [dateBegin, setDateBegin] = useState();
  const [dateCompareBegin, setDateCompareBegin] = useState(new Date(0));
  const [dateEnd, setDateEnd] = useState();
  const [dateCompareEnd, setDateCompareEnd] = useState(new Date("2250-1-1"));
  // const [refresh, setRefresh] = useState(true);

  const exposedValues = {
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
    
    dateBegin,
    setDateBegin,
    dateCompareBegin,
    setDateCompareBegin,
    dateEnd,
    setDateEnd,
    dateCompareEnd,
    setDateCompareEnd
  };
  return <timeScrollContext.Provider value={exposedValues}>{children}</timeScrollContext.Provider>;
}

export { timeScrollContext, TimeScrollProviderWrapper };