import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function StoryCopyPaste({setCopyPasting}) {
  const {setStory, setAuthors} = useContext(storyCreationContext)
  const [storyText, setStoryText] = useState("");
  const [messages, setMessages] = useState([]);
  // const [story, setStory] = useState([]);
  //"story" is an array of the conversation messages.
  // Each message in "story" is structured like this: [time, author, comment]
  const dateTime = /\[\d{1,2}:\d{2}, \d{1,2}\/\d{1,2}\/\d{4}\]/;
  const dateTimeGlobal = /\[\d{1,2}:\d{2}, \d{1,2}\/\d{1,2}\/\d{4}\]/g;

  const buildStory = () => {
    // detectar cuantos autores distintos hay y hacer un array con sus valores unicos.
    // al final story[i][1] será tal cual cada uno de esos autores!
    const newStory = [];
    const times = storyText.match(dateTimeGlobal);
    const authors = messages.map((message) => {
      const index = message.search(/:\s/);
      return message.slice(0, index);
    });
    
    setAuthors([...new Set(authors)]); // filtered unique value authors

    const comments = messages.map((message) => {
      const index = message.search(/:\s/);
      return message.slice(index + 2);
    });
    for (let i = 0; i < messages.length; i++) {
      newStory[i] = [];
      newStory[i][0] = times[i];
      newStory[i][1] = authors[i];
      newStory[i][2] = comments[i];
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

    setMessages(
      storyText
        .split(dateTime)
        .filter((nonEmpty) => nonEmpty)
        //first index of the array would otherwise always be empty due to split.
        .map((string) => string.slice(1, -1))
      //each string started with a single space and had a newline character at the end '\n'.
    );
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
