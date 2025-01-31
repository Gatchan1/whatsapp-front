import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../contexts/auth.context";

export default function StoryPage() {
  const { baseUrl, authenticateUser, isLoggedIn } = useContext(authContext);
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [storyInfo, setStoryInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");

    const isObjectId = storyId.length === 24;
    let retrievalUrl = `${baseUrl}/story/${storyId}`;
    if (!isObjectId) retrievalUrl += "/link"; // If storyId isn't the ObjectId then we consider it's the uuid.

    axios
      .get(retrievalUrl)
      .then((resp) => {
        const data = resp.data;
        setStoryInfo(data);
        setStory(parseStory(data.body));
      })
      .catch((err) => {
        console.log("el error!", err);
        if (err.code == "ERR_BAD_REQUEST" && err.response.status === 404) setErrorMessage("The story you’re looking for could not be found. Please check the URL.");
        else setErrorMessage("Ooops! Something wrong happened. Please try again later.");
      });
  }, [storyId]);

  return (
    <div>
      <h3>StoryPage</h3>
      {storyInfo && storyInfo.signed && <p>Author: {storyInfo.user.name}</p>}
      {story &&
        story.map((message, i) => {
          return (
            <div key={i} className={"message " + (message[1] == storyInfo.pov ? "pov" : "")}>
              <p>{message[0]}</p>
              <p>{message[1]}</p>
              <p>{message[2]}</p>
              <hr />
            </div>
          );
        })}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
