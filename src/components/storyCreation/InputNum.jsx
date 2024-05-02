import { useContext, useEffect, useState } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";

export default function InputNum({ delay, setDelay, unit }) {
  const { dateBegin, dateCompareBegin, dateEnd, dateCompareEnd } = useContext(timeScrollContext);

  const [isHover, setIsHover] = useState(false);
  const [beginDelay, setBeginDelay] = useState(0); // max delay for scrolling upwards
  const [endDelay, setEndDelay] = useState(0); // max delay for scrolling downwards

  useEffect(() => {
    const scrollInput = (e) => {
      e.preventDefault();
      if (e.deltaY < 0 && delay < endDelay) setDelay((delay) => delay + 1);
      if (e.deltaY > 0 && delay > beginDelay) setDelay((delay) => delay - 1); //scroll up
    };
    if (isHover) {
      window.addEventListener("wheel", scrollInput, { passive: false });
    }
    return () => window.removeEventListener("wheel", scrollInput);
  }, [isHover, delay, endDelay, beginDelay]);

  const unitMethods = [
    { unit: "hours", get: "getHours", set: "setHours", milliseconds: 3600000 },
    { unit: "minutes", get: "getMinutes", set: "setMinutes", milliseconds: 60000 },
    { unit: "date", get: "getDate", set: "setDate", milliseconds: 86400000 },
    { unit: "month", get: "getMonth", set: "setMonth" },
    { unit: "year", get: "getFullYear", set: "setFullYear" },
  ];

  const chooseUnitIndex = (timeUnit) => {
    return unitMethods.findIndex((elem) => elem.unit == timeUnit);
  };

  // set beginDelay and endDelay
  const handleMouseEnter = () => {
  //dateBegin is the date corresponding to the first ticked box.
  //dateEnd is the date corresponding to the last ticked box.
  /*dateCompareBegin is the date corresponding to the date PREVIOUS to the first ticked one
  (in case the first ticked one isn't the first date in the whole story!).*/
  /*dateCompareEnd is the date corresponding to the date that FOLLOWS the last ticked one
  (in case the last ticked one isn't the last date in the whole story!).*/
    setIsHover(true);
    const index = chooseUnitIndex(unit);

    // Take current delay into account; we want to calculate dateBegin and dateEnd as if delay was 0.
    const originalDateBegin = new Date(dateBegin);
    originalDateBegin[unitMethods[index].set](originalDateBegin[unitMethods[index].get]() - delay);
    const originalDateEnd = new Date(dateEnd);
    originalDateEnd[unitMethods[index].set](originalDateEnd[unitMethods[index].get]() - delay);

    // An hour and a minute will always have the same amount of milliseconds.
    // (Days don't because of daylight saving time!)
    if (0 <= index && index <= 1) {
      const millisecondsBegin = originalDateBegin - dateCompareBegin;
      const millisecondsEnd = dateCompareEnd - originalDateEnd;
      console.log("originalDateBegin", originalDateBegin);
      // console.log("setting begin delay", - Math.floor(millisecondsBegin / unitMethods[index].milliseconds))
      setBeginDelay(-Math.floor(millisecondsBegin / unitMethods[index].milliseconds));
      setEndDelay(Math.floor(millisecondsEnd / unitMethods[index].milliseconds));
      console.log("setting end delay", Math.floor(millisecondsEnd / unitMethods[index].milliseconds));
    } else {
      // Months and years don't have the same amount of milliseconds! We need a different way.
      let newBeginDelay = 0;
      let newEndDelay = 0;
      let tryDate = new Date(originalDateBegin);
      if (tryDate > dateCompareBegin) {
        while (tryDate > dateCompareBegin) {
          tryDate[unitMethods[index].set](tryDate[unitMethods[index].get]() - 1);
          if (tryDate >= dateCompareBegin) newBeginDelay--;
        }
        setBeginDelay(newBeginDelay);
        //console.log("beginDelay!", newBeginDelay);
      } else {
        setBeginDelay(delay);
        //console.log("beginDelay!", delay);
      }
      tryDate = new Date(originalDateEnd);
      if (dateCompareEnd > tryDate) {
        while (dateCompareEnd > tryDate) {
          tryDate[unitMethods[index].set](tryDate[unitMethods[index].get]() + 1);
          if (dateCompareEnd >= tryDate) newEndDelay++;
        }
        setEndDelay(newEndDelay);
        //console.log("endDelay!", newEndDelay);
      } else {
        setEndDelay(delay);
        //console.log("endDelay!", delay);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div id="inputNum" className="relative" onMouseLeave={handleMouseLeave}>
      <input
        value={delay}
        onChange={(e) => {
          console.log(e.target.value);
          if (Number(e.target.value) <= endDelay && Number(e.target.value) >= beginDelay) setDelay(Number(e.target.value));
        }}
        onMouseEnter={() => handleMouseEnter()}
      />
      {isHover && (
        <div className="column absolute" id="chevrons">
          <button
            className="up"
            onClick={() => {
              setDelay(delay + 1);
            }}
          />
          {/* TODO put limits.... */}
          <button className="down" onClick={() => setDelay(delay - 1)} />
        </div>
      )}
    </div>
  );
}
