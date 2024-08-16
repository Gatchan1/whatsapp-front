import { useContext, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function StoryCopyPaste({ setCopyPasting }) {
  const { setStory } = useContext(storyCreationContext);
  const [storyText, setStoryText] = useState("");

  const dateTime = /\[\d{1,2}:\d{2}, \d{1,2}\/\d{1,2}\/\d{4}\]/; // [0:01, 28/3/2024]
  const dateTimeGlobal = /\[\d{1,2}:\d{2}, \d{1,2}\/\d{1,2}\/\d{4}\]/g;

  const handleBuildStory = (e) => {
    e.preventDefault();
    if (!storyText) {
      setCopyPasting(false); // this component will cease to be shown (see CreatePage.jsx)
      return;
    }
    const splitStoryText = storyText.split(dateTime);
    splitStoryText.shift();
    //first index of the array would otherwise always be empty due to split.
    const messages = splitStoryText.map((string) => string.trim());
    //each string started with a single space and had a newline character at the end '\n'.

    const times = storyText.match(dateTimeGlobal);
    const dates = times.map((time) => {
      const noBrackets = time.slice(1, time.length - 1);
      const [timeString, dateStringWithoutSpace] = noBrackets.split(", ");
      let [hours, minutes] = timeString.split(":");
      const [day, month, year] = dateStringWithoutSpace.split("/");
      if (minutes.length != 2) minutes = "0" + minutes;
      return new Date(`${year}-${month}-${day} ${hours}:${minutes}`);
    });

    const authors = messages.map((message) => {
      const index = message.search(/:\s/);
      return message.slice(0, index);
    });

    const comments = messages.map((message) => {
      const index = message.search(/:\s/);
      return message.slice(index + 2);
    });

    const newStory = [];
    for (let i = 0; i < messages.length; i++) {
      newStory[i] = [];
      newStory[i][0] = false; //checkbox for date modification
      newStory[i][1] = i + 1;
      newStory[i][2] = dates[i];
      newStory[i][3] = authors[i];
      newStory[i][4] = comments[i];
    }
    setStory(newStory);
    setCopyPasting(false); // this component will cease to be shown (see CreatePage.jsx)
  };

  return (
    <div>
      <div>
        <h3>StoryCopyPaste</h3>
        <form>
          <textarea className="copy-paste" rows="20" cols="50" placeholder="*Paste your desired whatsapp conversation fragment here*" onChange={(e) => setStoryText(e.target.value)} />
          <button onClick={handleBuildStory}>Start</button>
        </form>
      </div>
    </div>
  );
}
