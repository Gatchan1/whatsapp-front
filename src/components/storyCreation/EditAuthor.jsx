import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function EditAuthor({author}) {
    const { story, setStory, storyCopy } = useContext(storyCreationContext);
    const [value, setValue] = useState(author);

    useEffect(()=>{
        setValue(author);
    },[story])

    const updateAuthor = () => {
        const newStory = storyCopy();
        for (let i = 0; i < story.length; i++) {
            if (newStory[i][2] == author) {
                newStory[i][2] = value;
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
    <form className="author" onSubmit={(e) => e.preventDefault()}>
    <input onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} size={value.length} value={value}/>
    {/* I don't know how to further adjust the input size... */}
    </form>
  )
}