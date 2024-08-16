import { useContext, useEffect, useState } from "react";
import { storyCreationContext } from "../../../contexts/storyCreation.context";

export default function CheckboxAuthors({author}) {
    const { chosenPov, setChosenPov } = useContext(storyCreationContext);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(()=>{
        if (chosenPov != author) {
            setIsChecked(false);
        }
    },[chosenPov])

    const handleCheckbox = (author) => {
        if (!isChecked) {
            setChosenPov(author);
        } else {
            setChosenPov(null);
        }
        setIsChecked(!isChecked);
    }

  return (
    <div>
        <input className="checkbox" type="checkbox" checked={isChecked} onChange={() => handleCheckbox(author)} />
    </div>
  )
}
