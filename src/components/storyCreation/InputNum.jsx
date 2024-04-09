import { useContext, useEffect, useState } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";

export default function InputNum({ delay, setDelay, unit, setExitHover }) {
  const { dateBegin, dateCompareBegin, dateEnd, dateCompareEnd } = useContext(timeScrollContext);

  const [isHover, setIsHover] = useState(false);
  // const [originalValue, setOriginalValue] = useState(false);

  const unitMethods = [
    { unit: "hours", get: "getHours", set: "setHours" },
    { unit: "minutes", get: "getMinutes", set: "setMinutes" },
    { unit: "date", get: "getDate", set: "setDate" },
    { unit: "month", get: "getMonth", set: "setMonth" },
    { unit: "year", get: "getFullYear", set: "setFullYear" },
  ];

  const chooseUnitIndex = (timeUnit) => {
    return unitMethods.findIndex((elem) => elem.unit == timeUnit);
  };

  useEffect(() => {
    // console.log("max", max)
    const scrollInput = (e) => {
      e.preventDefault();
      if (e.deltaY < 0 && canScrollUp()) setDelay(delay + 1);
      if (e.deltaY > 0 && canScrollDown()) setDelay(delay - 1);
    };
    if (isHover) {
      window.addEventListener("wheel", scrollInput, { passive: false });
    }
    return () => window.removeEventListener("wheel", scrollInput);
  }, [isHover, delay]);

  const canScrollDown = (amount = 2) => {
    //Scroll down = decrease time (move towards "beginning")
    const date = new Date(dateBegin);
    let index = chooseUnitIndex(unit);
    date[unitMethods[index].set](date[unitMethods[index].get]() - amount);
    console.log("futura date", date)
    if (date >= dateCompareBegin) {
      return true;
    } else return false;
  };

  const canScrollUp = (amount = 2) => {
    //Scroll up = advance in time (move towards "end")
    const date = new Date(dateEnd);
    let index = chooseUnitIndex(unit);
    date[unitMethods[index].set](date[unitMethods[index].get]() + amount);
    if (dateCompareEnd >= date) {
      return true;
    } else return false;
  };

  return (
    <div
      id="inputNum"
      className="relative"
      onMouseLeave={() => {
        setIsHover(false);
        setExitHover((hover) => !hover);
      }}
    >
      <input
        value={delay}
        onChange={(e) => {
          if ((Number(e.target.value) < delay && canScrollDown(e.target.value)) || (Number(e.target.value) > delay && canScrollUp(e.target.value))) setDelay(Number(e.target.value));
        }}
        onMouseEnter={() => setIsHover(true)}
      />
      {isHover && (
        <div className="column absolute" id="chevrons">
          <button className="up" onClick={() => {setDelay(delay + 1)}} />
          {/* TODO put limits.... */}
          <button className="down" onClick={() => setDelay(delay - 1)} />
        </div>
      )}
    </div>
  );
}
