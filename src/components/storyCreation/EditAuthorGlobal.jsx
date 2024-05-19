import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../contexts/storyCreation.context";

export default function EditAuthorGlobal({author}) {
    const { story, setStory, storyCopy, retrieveUniqueAuthors } = useContext(storyCreationContext);
    const [value, setValue] = useState(author);
    
    useEffect(()=>{
        setValue(author);
    },[story, author])
    
    const updateAll = () => {
        const newStory = storyCopy();
        for (let i = 0; i < story.length; i++) {
            if (newStory[i][2] == author) {
                newStory[i][2] = value;
            }
        }
        setStory(newStory);
        retrieveUniqueAuthors(newStory);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateAll();
        }
    }

  return (
    <form className="author" onSubmit={(e) => e.preventDefault()}>
    <input onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} size={value.length} value={value}/>
    </form>
  )
}