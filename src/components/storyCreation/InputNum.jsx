import { useContext, useEffect, useState } from "react";
import { timeScrollContext } from "../../contexts/timeScroll.context";

export default function InputNum({ delay, setDelay, hour }) {
  const { dateBegin, dateCompareBegin, dateEnd, dateCompareEnd } = useContext(timeScrollContext);

  const [isHover, setIsHover] = useState(false);
  // const [originalValue, setOriginalValue] = useState(false);

  useEffect(() => {}, []);

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

  const canScrollDown = (amount = 1) => {
    //Scroll down = decrease time (move towards "beginning")
    const date = new Date(dateBegin);
    if (hour) {
      date.setHours(date.getHours() + delay - amount);
      if (date > dateCompareBegin) {
        return true;
      } else return false;
    }
  };

  const canScrollUp = (amount = 1) => {
    //Scroll up = advance in time (move towards "end")
    const date = new Date(dateEnd);
    if (hour) {
      date.setHours(date.getHours() + delay + amount);
      if (dateCompareEnd > date) {
        return true;
      } else return false;
    }
  };

  return (
    <div id="inputNum" className="relative" onMouseLeave={() => setIsHover(false)}>
      <input
        value={delay}
        onChange={(e) => {
          if ((Number(e.target.value) < delay && canScrollDown(e.target.value)) || (Number(e.target.value) > delay && canScrollUp(e.target.value))) setDelay(Number(e.target.value));
        }}
        onMouseEnter={() => setIsHover(true)}
      />
      {isHover && (
        <div className="column absolute" id="chevrons">
          <button className="up" onClick={() => setDelay(delay + 1)} />
          {/* TODO put limits.... */}
          <button className="down" onClick={() => setDelay(delay - 1)} />
        </div>
      )}
    </div>
  );
}
