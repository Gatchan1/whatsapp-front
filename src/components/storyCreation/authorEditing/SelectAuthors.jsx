import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../../contexts/storyCreation.context";

export default function SelectAuthors({selectOne}) {
  const { uniqueAuthors } = useContext(storyCreationContext);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (uniqueAuthors && uniqueAuthors[0]) {
      let newWidth = uniqueAuthors[0].length;
      for (let i = 1; i < uniqueAuthors.length; i++) {
        if (uniqueAuthors[i].length > newWidth) newWidth = uniqueAuthors[i].length;
      }
      setWidth(newWidth);
    }
  }, []);

  return (
    <div className="absolute select-authors column">
      {uniqueAuthors.map((author, i) => {
        return (
          <button style={{ width: width*7.5+10+"px"}} key={i} onMouseDown={() => selectOne(author)}>
            {author}
          </button>
        );
      })}
    </div>
  );
}