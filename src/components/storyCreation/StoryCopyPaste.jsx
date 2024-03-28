import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function StoryCopyPaste({ setCopyPasting }) {
  const { setStory } = useContext(storyCreationContext);
  const [storyText, setStoryText] = useState("");
  const [messages, setMessages] = useState([]);
  const dateTime = /\[\d{1,2}:\d{2}, \d{1,2}\/\d{1,2}\/\d{4}\]/;
  // [0:01, 28/3/2024]
  const dateTimeGlobal = /\[\d{1,2}:\d{2}, \d{1,2}\/\d{1,2}\/\d{4}\]/g;

  //TODO: proteger la entrada de datos que no encajen!!!
  const buildStory = () => {
    // detectar cuantos autores distintos hay y hacer un array con sus valores unicos.
    // al final story[i][1] será tal cual cada uno de esos autores!
    const newStory = [];
    const times = storyText.match(dateTimeGlobal);

    const dates = times.map((time) => {
      const noBrackets = time.slice(1, time.length - 1);
      const [timeString, dateStringWithoutSpace] = noBrackets.split(", ");
      let [hours, minutes] = timeString.split(":"); //.map(Number);
      const [day, month, year] = dateStringWithoutSpace.split("/"); //.map(Number);
      // return new Date(year, month - 1, day, hours, minutes);
      if (minutes.length != 2) minutes = "0" + minutes;
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    });
    const authors = messages.map((message) => {
      const index = message.search(/:\s/);
      return message.slice(0, index);
    });

    const comments = messages.map((message) => {
      const index = message.search(/:\s/);
      return message.slice(index + 2);
    });
    for (let i = 0; i < messages.length; i++) {
      newStory[i] = [];
      newStory[i][0] = false;
      newStory[i][1] = dates[i];
      newStory[i][2] = authors[i];
      newStory[i][3] = comments[i];
    }
    // console.log(newStory);
    setStory(newStory);
  };

  useEffect(() => {
    if (messages[0]) {
      buildStory();
      setCopyPasting(false); // this component will cease to be shown (see CreatePage.jsx)
    }
  }, [messages]);

  const handleRestructuring = (e) => {
    e.preventDefault();
    if (!storyText) return;

    const splitStory = storyText.split(dateTime);
    splitStory.shift();
    //first index of the array would otherwise always be empty due to split.
    setMessages(splitStory.map((string) => string.trim()));
    //each string started with a single space and had a newline character at the end '\n'.
  };

  return (
    <div>
      <div>
        <h3>StoryCopyPaste</h3>
        <form>
          <textarea className="copy-paste" rows="20" cols="50" placeholder="*Paste your desired whatsapp conversation fragment here*" onChange={(e) => setStoryText(e.target.value)} />
          <button onClick={handleRestructuring}>Start</button>
        </form>
      </div>
    </div>
  );
}
