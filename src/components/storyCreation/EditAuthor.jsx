import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function EditAuthor({author}) {
    const { story, setStory } = useContext(storyCreationContext);
    const [value, setValue] = useState(author);

    useEffect(()=>{
        setValue(author);
    },[story])

    const updateAuthor = () => {
        const newStory = JSON.parse(JSON.stringify(story));
        for (let i = 0; i < story.length; i++) {
            if (newStory[i][1] == author) {
                newStory[i][1] = value;
            }
        }
        setStory(newStory);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateAuthor();
        }
    }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
    <input onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} value={value}/>
    </form>
  )
}