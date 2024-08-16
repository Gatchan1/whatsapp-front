import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../contexts/auth.context";

export default function StoryPage() {
  const { baseUrl, authenticateUser, isLoggedIn } = useContext(authContext);
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [povAuthor, setPovAuthor] = useState("");

  const parseStory = (json) => {
    const parsedStory = JSON.parse(json);
    parsedStory.forEach((element) => {
        const date = new Date(element[0]);
        element[0] = new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(date);
    });
    return parsedStory;
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/story/${storyId}`)
      .then(({ data }) => {
        console.log(data);
        setStory(parseStory(data.body));
        setPovAuthor(data.pov);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>StoryPage</h3>
      {story &&
        story.map((message, i) => {
          return (
            <div key={i} className={"message " + (message[1] == povAuthor ? "pov" : "")}>
              <p>{message[0]}</p>
              <p>{message[1]}</p>
              <p>{message[2]}</p>
              <hr />
            </div>
          );
        })}
    </div>
  );
}
